import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import getBaseHeaders from "./base-headers.js";

export default function getRootResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(null, {
		"headers": {
			...getBaseHeaders(isPreflight),
			"access-control-allow-origin": origin,
			"access-control-max-age": "31536000",
			...(isPreflight
				? {}
				: {
						"cache-control": "immutable, max-age=31536000, public",
						"location": `${origin}/`,
					}),
		},
		"status": isPreflight ? StatusCode.OK : StatusCode.SeeOther,
	});
}
