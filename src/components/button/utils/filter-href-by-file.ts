export default function filterHrefByFile(href: string | undefined): boolean {
  return typeof href === 'string' && href.endsWith('.pdf');
}
