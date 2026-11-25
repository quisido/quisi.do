import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import getBaseHeaders from "./base-headers.js";

export default function getMethodNotAllowedResponse(
	origin: Env["ORIGIN"],
	method: string,
): ReadonlyDeep<Response> {
	return new Response(
		method === "HEAD" ? null : `Method "${method}" is not allowed.`,
		{
			"headers": {
				...getBaseHeaders(false),
				"access-control-allow-origin": origin,
				"cache-control": "no-store",
				"content-type": "text/plain; charset=utf-8",
				"vary": "*",
			},
			"status": StatusCode.MethodNotAllowed,
		},
	);
}
