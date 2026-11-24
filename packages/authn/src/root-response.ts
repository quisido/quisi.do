import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import { CREDENTIALS_HEADERS, PREFLIGHT_HEADERS } from "./cors-headers.js";
import SECURITY_HEADERS from "./security-headers.js";

export default function getRootResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(null, {
		"headers": {
			...SECURITY_HEADERS,
			...CREDENTIALS_HEADERS,
			...(isPreflight ? PREFLIGHT_HEADERS : {}),
			"access-control-allow-origin": origin,
			"access-control-max-age": "31536000",
			"cache-control": "immutable, max-age=31536000, public",
			...(isPreflight ? {} : { "location": `${origin}/` }),
		},
		"status": isPreflight ? StatusCode.OK : StatusCode.SeeOther,
	});
}
