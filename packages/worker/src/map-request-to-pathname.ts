export default function mapRequestToPathname({ url }: Request): string {
  const { pathname } = new URL(url);
  return pathname;
}
