import { StaticPathname } from '../constants/static-pathname.js';

const PATHNAMES: Set<unknown> = new Set<unknown>(
  Object.values(StaticPathname),
);

export default function isReservedPathname(
  value: unknown,
): value is StaticPathname {
  return PATHNAMES.has(value);
}
