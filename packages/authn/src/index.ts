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
		request: Request,
		env: Env,
	): Promise<Response> {
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
			},
		}));
	},
};
