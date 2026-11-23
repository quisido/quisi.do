import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";
import SECURITY_HEADERS from "./security-headers.js";

export default function getRootResponse(
	origin: Env["ORIGIN"],
): ReadonlyDeep<Response> {
	return new Response(null, {
		headers: {
			...SECURITY_HEADERS,
			"cache-control": "public, max-age=86400",
			location: `${origin}/`,
		},
		status: StatusCode.PermanentRedirect,
	});
}
