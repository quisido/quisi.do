import { AuthenticationPathname } from './authentication-pathname.js';

const PATHNAMES: Set<unknown> = new Set<unknown>(
  Object.values(AuthenticationPathname),
);

export default function isAuthenticationPathname(
  value: unknown,
): value is AuthenticationPathname {
  return PATHNAMES.has(value);
}
