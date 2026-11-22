import type { ReadonlyDeep } from "#lib/readonly-deep.js";

export default function getRobotsTxtResponse(): ReadonlyDeep<Response> {
	return new Response("User-agent: *\nDisallow: /\n", {
		"headers": {
			"access-control-max-age": "31536000",
			"cache-control": "immutable, max-age=31536000, public",
			"content-type": "text/plain; charset=utf-8",
			"x-content-type-options": "nosniff",
			"x-frame-options": "SAMEORIGIN",
		},
	});
}
