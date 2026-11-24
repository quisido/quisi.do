import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import getFaviconIcoResponse from "./favicon-ico-response.js";
import getRobotsTxtResponse from "./robots-txt-response.js";
import getRootResponse from "./root-response.js";
import getWhoAmIResponse from "./who-am-i-response.js";

export default {
	fetch(
		request: ReadonlyDeep<Request>,
		env: ReadonlyDeep<Env>,
	): ReadonlyDeep<Promise<Response>> {
		const pathname: string = new URL(request.url).pathname;
		const isPreflight: boolean = request.method === "OPTIONS";

		if (pathname === "/") {
			return Promise.resolve(getRootResponse(env.ORIGIN, isPreflight));
		}

		if (pathname === "/favicon.ico") {
			return Promise.resolve(
				getFaviconIcoResponse(env.ORIGIN, isPreflight),
			);
		}

		if (pathname === "/robots.txt") {
			return Promise.resolve(
				getRobotsTxtResponse(env.ORIGIN, isPreflight),
			);
		}

		return Promise.resolve(getWhoAmIResponse(
			request.headers.get("Origin"),
			env.ORIGIN,
			isPreflight,
		));
	},
};
