export default function mapBlockedUrlToOriginPathname(
  url: string | null,
): string {
  if (url === null) {
    return '';
  }

  try {
    const { origin, pathname } = new URL(url);
    return `${origin}${pathname}`;
  } catch (_err: unknown) {
    return url;
  }
}
