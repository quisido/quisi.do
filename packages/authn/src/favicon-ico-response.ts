import { FAVICON } from "#lib/favicon.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { CREDENTIALS_HEADERS, PREFLIGHT_HEADERS } from "./cors-headers.js";
import SECURITY_HEADERS from "./security-headers.js";

export default function getFaviconIcoResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(isPreflight ? null : FAVICON, {
		"headers": {
			...SECURITY_HEADERS,
			...CREDENTIALS_HEADERS,
			...(isPreflight ? PREFLIGHT_HEADERS : {}),
			"access-control-allow-origin": origin,
			"access-control-max-age": "31536000",
			"cache-control": "immutable, max-age=31536000, public",
			"content-type": "image/vnd.microsoft.icon",
		},
	});
}
