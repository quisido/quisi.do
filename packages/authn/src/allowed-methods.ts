import type { ReadonlyDeep } from "#lib/readonly-deep.js";

type AllowedMethod = "GET" | "OPTIONS";

const ALLOWED_METHODS: ReadonlyDeep<Record<AllowedMethod, true>> = {
	GET: true,
	OPTIONS: true,
};

export const ALLOW_HEADER_VALUE: string = Object.keys(ALLOWED_METHODS).join(
	", ",
);

export default ALLOWED_METHODS;
