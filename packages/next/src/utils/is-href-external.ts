export default function isHrefExternal(href: string | undefined): boolean {
  return typeof href === 'string' && /^https?:\/\//.test(href);
}
