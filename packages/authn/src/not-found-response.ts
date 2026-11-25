import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import getBaseHeaders from "./base-headers.js";

export default function getNotFoundResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(isPreflight ? new Blob(["Not Found"]) : "Not Found", {
		"headers": {
			...getBaseHeaders(isPreflight),
			"access-control-allow-origin": origin,
			"access-control-max-age": "31536000",
			...(isPreflight
				? {
						"vary": "*",
					}
				: {
						"cache-control": "no-store",
						"content-type": "text/plain; charset=utf-8",
						"vary": "*",
					}),
		},
		"status": StatusCode.NotFound,
	});
}
