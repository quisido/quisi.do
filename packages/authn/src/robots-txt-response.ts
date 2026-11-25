import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import getBaseHeaders from "./base-headers.js";

export default function getRobotsTxtResponse(
	origin: Env["ORIGIN"],
	isPreflight: boolean,
): ReadonlyDeep<Response> {
	return new Response(
		isPreflight ? null : "User-agent: *\nDisallow: /\n",
		{
			"headers": {
				...getBaseHeaders(isPreflight),
				"access-control-allow-origin": origin,
				"access-control-max-age": "31536000",
				...(isPreflight
					? {}
					: {
							"cache-control": "immutable, max-age=31536000, public",
							"content-type": "text/plain; charset=utf-8",
						}),
			},
		},
	);
}
