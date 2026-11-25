import ErrorCode from "#lib/error-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import getBaseHeaders from "./base-headers.js";

export default function getWhoAmIResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(
		isPreflight
			? null
			: JSON.stringify({ code: ErrorCode.Unauthenticated }),
		{
			"headers": {
				...getBaseHeaders(isPreflight),
				"access-control-allow-origin": origin,
				"access-control-max-age": "31536000",
				...(isPreflight
					? {}
					: {
							"cache-control": "no-store",
							"content-type": "application/json",
							"vary": "*",
						}),
			},
		},
	);
}
