export default function isFileHref(href: string | undefined): boolean {
  return (
    typeof href === 'string' && (href.endsWith('.jpg') || href.endsWith('.pdf'))
  );
}
