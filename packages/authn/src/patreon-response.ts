import assert from "#lib/assert.js";
import ErrorCode from "#lib/error-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import getBaseHeaders from "./base-headers.js";

interface PatreonState {
	readonly returnPath: unknown;
	readonly sessionId: unknown;
}

type PatreonStateField = keyof PatreonState;

interface PatreonStateError {
	readonly errorCode: ErrorCode;
	readonly returnPath: string;
}

interface PatreonStateSuccess {
	readonly returnPath: string;
	readonly sessionId: string;
}

type PatreonStateValidation = PatreonStateError | PatreonStateSuccess;

interface PatreonStateParseError {
	readonly errorCode: ErrorCode;
}

interface PatreonStateParseSuccess {
	readonly state: unknown;
}

type PatreonStateParse =
	| PatreonStateParseError
	| PatreonStateParseSuccess;

const DEFAULT_RETURN_PATH: string = "/";

const MAX_PATREON_STATE_FIELD_LENGTH: number = 2_048;

const SESSION_ID_COOKIE_NAME: string = "__Secure-Session-ID";

const PATREON_STATE_FIELD_ERROR_CODES: ReadonlyDeep<
	Record<PatreonStateField, Record<"missing" | "invalid", ErrorCode>>
> = {
	"returnPath": {
		"invalid": ErrorCode.PatreonStateReturnPathInvalid,
		"missing": ErrorCode.PatreonStateReturnPathMissing,
	},
	"sessionId": {
		"invalid": ErrorCode.PatreonStateSessionIdInvalid,
		"missing": ErrorCode.PatreonStateSessionIdMissing,
	},
};

const PATREON_CSRF_ERROR_CODES: ReadonlyDeep<Record<string, ErrorCode | null>> =
	{
		"false": ErrorCode.PatreonCsrfInvalid,
		"true": null,
	};

function isObjectRecord(value: unknown): value is PatreonState {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPatreonStateFieldValue(
	field: PatreonStateField,
	value: string,
): boolean {
	return (
		value.length > 0 &&
		value.length <= MAX_PATREON_STATE_FIELD_LENGTH &&
		(field !== "returnPath" ||
			/^\/(?:[\x21\x22\x24-\x2e\x30-\x5b\x5d-\x7e][\x21\x22\x24-\x5b\x5d-\x7e]*)?$/u.test(
				value,
			))
	);
}

function isPatreonStateFieldString(
	field: PatreonStateField,
	value: unknown,
): value is string {
	return typeof value === "string" && isPatreonStateFieldValue(field, value);
}

function getPatreonStateFieldErrorCode(
	field: PatreonStateField,
	value: unknown,
): ErrorCode | null {
	if (value === undefined) {
		return PATREON_STATE_FIELD_ERROR_CODES[field]["missing"];
	}

	return isPatreonStateFieldString(field, value)
		? null
		: PATREON_STATE_FIELD_ERROR_CODES[field]["invalid"];
}

function parsePatreonState(state: string): ReadonlyDeep<PatreonStateParse> {
	try {
		return { state: JSON.parse(state) };
	} catch {
		return { errorCode: ErrorCode.PatreonStateNonJson };
	}
}

function validatePatreonState(
	stateValue: ReadonlyDeep<PatreonState>,
): ReadonlyDeep<PatreonStateValidation> {
	const returnPath: string = isPatreonStateFieldString(
		"returnPath",
		stateValue["returnPath"],
	)
		? stateValue["returnPath"]
		: DEFAULT_RETURN_PATH;

	const returnPathErrorCode: ErrorCode | null = getPatreonStateFieldErrorCode(
		"returnPath",
		stateValue["returnPath"],
	);

	const sessionIdErrorCode: ErrorCode | null = getPatreonStateFieldErrorCode(
		"sessionId",
		stateValue["sessionId"],
	);

	const errorCode: ErrorCode | null = returnPathErrorCode ?? sessionIdErrorCode;

	if (errorCode !== null) {
		return { errorCode, returnPath };
	}

	assert(isPatreonStateFieldString("sessionId", stateValue["sessionId"]));

	return { returnPath, sessionId: stateValue["sessionId"] };
}

function getPatreonStateValidation(
	state: null | string,
): ReadonlyDeep<PatreonStateValidation> {
	if (state === null) {
		return {
			errorCode: ErrorCode.PatreonStateMissing,
			returnPath: DEFAULT_RETURN_PATH,
		};
	}

	const parse: ReadonlyDeep<PatreonStateParse> = parsePatreonState(state);

	if ("errorCode" in parse) {
		return {
			errorCode: parse.errorCode,
			returnPath: DEFAULT_RETURN_PATH,
		};
	}

	if (!isObjectRecord(parse.state)) {
		return {
			errorCode: ErrorCode.PatreonStateNonRecord,
			returnPath: DEFAULT_RETURN_PATH,
		};
	}

	return validatePatreonState(parse.state);
}

function getCsrfErrorCode(
	sessionId: string,
	cookieHeader: null | string,
): ErrorCode | null {
	const sessionIdCookieValues: string =
		cookieHeader
			?.split(";")
			.map((cookiePair: string): string => cookiePair.trim())
			.filter((cookiePair: string): boolean =>
				cookiePair.startsWith(`${SESSION_ID_COOKIE_NAME}=`),
			)
			.map(
				(cookiePair: string): string =>
					cookiePair.slice(SESSION_ID_COOKIE_NAME.length + 1),
			)
			.filter((cookieValue: string): boolean => cookieValue.length > 0)
			.join(";") ?? "";

	if (sessionIdCookieValues.length === 0) {
		return ErrorCode.PatreonCsrfMissing;
	}

	const csrfErrorCode: ErrorCode | null | undefined =
		PATREON_CSRF_ERROR_CODES[
			String(
				sessionIdCookieValues
					.split(";")
					.every(
						(cookieValue: string): boolean => cookieValue === sessionId,
					),
			)
		];

	assert(csrfErrorCode !== undefined);

	return csrfErrorCode;
}

export default function getPatreonResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
	request: ReadonlyDeep<Request>,
): ReadonlyDeep<Response> {
	if (isPreflight) {
		return new Response(null, {
			"headers": {
				...getBaseHeaders(true),
				"access-control-allow-origin": origin,
				"access-control-max-age": "31536000",
			},
		});
	}

	const validation: ReadonlyDeep<PatreonStateValidation> =
		getPatreonStateValidation(new URL(request.url).searchParams.get("state"));

	const errorCode: ErrorCode | null =
		"errorCode" in validation
			? validation.errorCode
			: getCsrfErrorCode(
					validation.sessionId,
					request.headers.get("cookie"),
				);

	return new Response(null, {
		"headers": {
			...getBaseHeaders(false),
			"access-control-allow-origin": origin,
			"cache-control": "no-store",
			"location": `${origin}${validation.returnPath}#authn:error=${String(errorCode)}`,
			"vary": "*",
		},
		"status": StatusCode.SeeOther,
	});
}
