import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { ALLOW_HEADER_VALUE } from "./allowed-methods.js";
import { CREDENTIALS_HEADERS, CORS_HEADERS } from "./cors-headers.js";
import SECURITY_HEADERS, { NOSNIFF_HEADERS } from "./security-headers.js";

export default function getBaseHeaders(
	isPreflight: boolean,
): ReadonlyDeep<Record<string, string>> {
	return {
		...SECURITY_HEADERS,
		...(isPreflight ? {} : NOSNIFF_HEADERS),
		...CREDENTIALS_HEADERS,
		...CORS_HEADERS,
		"allow": ALLOW_HEADER_VALUE,
	};
}
