export default function mapHashToHref(hash: string): string {
  const { pathname, search } = window.location;
  if (hash === '') {
    return `${pathname}${search}`;
  }

  return `${pathname}${search}#${hash}`;
}
