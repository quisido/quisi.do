import { OAuthPathname } from './oauth-pathname.js';

const PATHNAMES: Set<unknown> = new Set<unknown>(Object.values(OAuthPathname));

export default function isOAuthPathname(
  value: unknown,
): value is OAuthPathname {
  return PATHNAMES.has(value);
}
