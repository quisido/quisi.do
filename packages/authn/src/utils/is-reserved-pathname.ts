import ReservedPathname from '../constants/reserved-pathname.js';

const RESERVED_PATHNAMES: Set<unknown> = new Set<unknown>(
  Object.values(ReservedPathname),
);

export default function isReservedPathname(
  value: unknown,
): value is ReservedPathname {
  return RESERVED_PATHNAMES.has(value);
}
