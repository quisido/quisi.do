import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { ALLOW_HEADER_VALUE } from "./allowed-methods.js";

export const CREDENTIALS_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"access-control-allow-credentials": "true",
};

export const CORS_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"access-control-allow-headers": "Baggage, Sentry-Trace",
	"access-control-allow-methods": ALLOW_HEADER_VALUE,
	"access-control-expose-headers": "allow",
};
