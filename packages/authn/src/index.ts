import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import ALLOWED_METHODS from "./allowed-methods.js";
import getFaviconIcoResponse from "./favicon-ico-response.js";
import getMethodNotAllowedResponse from "./method-not-allowed-response.js";
import getNotFoundResponse from "./not-found-response.js";
import getPatreonResponse from "./patreon-response.js";
import getRobotsTxtResponse from "./robots-txt-response.js";
import getRootResponse from "./root-response.js";
import getWhoAmIResponse from "./who-am-i-response.js";

type Route = (
	origin: Env["ORIGIN"],
	isPreflight: boolean,
	request: ReadonlyDeep<Request>,
) => ReadonlyDeep<Response>;

const ROUTES: ReadonlyDeep<Record<string, Route>> = {
	"/": getRootResponse,
	"/favicon.ico": getFaviconIcoResponse,
	"/patreon/": getPatreonResponse,
	"/robots.txt": getRobotsTxtResponse,
	"/whoami/": getWhoAmIResponse,
};

function getRoute(pathname: string): ReadonlyDeep<Route | undefined> {
	return Object.hasOwn(ROUTES, pathname) ? ROUTES[pathname] : undefined;
}

export default {
	fetch(
		request: ReadonlyDeep<Request>,
		env: ReadonlyDeep<Env>,
	): ReadonlyDeep<Promise<Response>> {
		const url: ReadonlyDeep<URL> = new URL(request.url);
		const isPreflight: boolean = request.method === "OPTIONS";
		const route: ReadonlyDeep<Route | undefined> = getRoute(url.pathname);

		if (route === undefined) {
			return Promise.resolve(getNotFoundResponse(env.ORIGIN, isPreflight));
		}

		if (!Object.hasOwn(ALLOWED_METHODS, request.method)) {
			return Promise.resolve(
				getMethodNotAllowedResponse(env.ORIGIN, request.method),
			);
		}

		return Promise.resolve(route(env.ORIGIN, isPreflight, request));
	},
};
