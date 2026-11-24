import ErrorCode from "#lib/error-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { CREDENTIALS_HEADERS, PREFLIGHT_HEADERS } from "./cors-headers.js";
import SECURITY_HEADERS from "./security-headers.js";

const LOCALHOST_ORIGIN_PATTERN: ReadonlyDeep<RegExp> =
	/^https?:\/\/localhost$|^https?:\/\/localhost:\d{1,5}$/u;

export default function getWhoAmIResponse(
	requestOrigin: string | null,
	fallbackOrigin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	const allowedOrigin: string =
		requestOrigin !== null && LOCALHOST_ORIGIN_PATTERN.test(requestOrigin)
			? requestOrigin
			: fallbackOrigin;

	return new Response(
		isPreflight
			? null
			: JSON.stringify({ code: ErrorCode.Unauthenticated }),
		{
			"headers": {
				...SECURITY_HEADERS,
				...CREDENTIALS_HEADERS,
				...(isPreflight ? PREFLIGHT_HEADERS : {}),
				"access-control-allow-origin": allowedOrigin,
				"cache-control": "no-store",
				"content-type": "application/json",
				"vary": "Origin",
			},
		},
	);
}
