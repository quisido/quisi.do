import { FAVICON } from "#lib/favicon.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import getBaseHeaders from "./base-headers.js";

export default function getFaviconIcoResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(isPreflight ? null : FAVICON, {
		"headers": {
			...getBaseHeaders(isPreflight),
			"access-control-allow-origin": origin,
			"access-control-max-age": "31536000",
			...(isPreflight
				? {}
				: {
						"cache-control": "immutable, max-age=31536000, public",
						"content-type": "image/vnd.microsoft.icon",
					}),
		},
	});
}
