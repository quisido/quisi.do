import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const SECURITY_HEADERS: ReadonlyDeep<Record<string, string>> = {
	"content-security-policy": "frame-ancestors 'none';",
	"x-content-type-options": "nosniff",
	"x-frame-options": "DENY",
};

export default SECURITY_HEADERS;
