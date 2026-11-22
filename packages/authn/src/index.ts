import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import getFaviconIcoResponse from "./favicon-ico-response.js";

const isLocalhostOrigin = (origin: string): boolean =>
	new URL(origin).hostname === "localhost";

const getAllowedOrigin = (
	origin: string | null,
	cookieDomain: Env["COOKIE_DOMAIN"],
): string => {
	if (origin === null) {
		return "*";
	}

	return isLocalhostOrigin(origin) ? origin : `https://${cookieDomain}`;
};

export default {
	fetch(
		request: ReadonlyDeep<Request>,
		env: ReadonlyDeep<Env>,
	): ReadonlyDeep<Promise<Response>> {
		if (new URL(request.url).pathname === "/favicon.ico") {
			return Promise.resolve(getFaviconIcoResponse());
		}

		const allowedOrigin: string = getAllowedOrigin(
			request.headers.get("Origin"),
			env.COOKIE_DOMAIN,
		);

		const body: string | null =
			request.method === "OPTIONS" ? null : JSON.stringify({ code: 1 });

		return Promise.resolve(new Response(body, {
			headers: {
				"access-control-allow-origin": allowedOrigin,
				"content-type": "application/json",
				"x-content-type-options": "nosniff",
				"x-frame-options": "SAMEORIGIN",
			},
		}));
	},
};
