import type { ReadonlyDeep } from "#lib/readonly-deep.js";

export const CREDENTIALS_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"access-control-allow-credentials": "true",
};

export const PREFLIGHT_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"access-control-allow-headers": "Baggage, Sentry-Trace",
	"access-control-allow-methods": "GET",
};
