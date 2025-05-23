import { StaticPathname } from './static-pathname.js';

const PATHNAMES: Set<unknown> = new Set<unknown>(Object.values(StaticPathname));

export default function isStaticPathname(
  value: unknown,
): value is StaticPathname {
  return PATHNAMES.has(value);
}
