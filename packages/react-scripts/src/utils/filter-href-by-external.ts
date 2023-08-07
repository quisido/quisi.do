export default function filterHrefByExternal(
  href: string | undefined,
): boolean {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}
