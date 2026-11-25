import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const SECURITY_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"content-security-policy": "frame-ancestors 'none';",
	"x-frame-options": "DENY",
};

export const NOSNIFF_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"x-content-type-options": "nosniff",
};

export default SECURITY_HEADERS;
