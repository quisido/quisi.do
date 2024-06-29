export default function mapUrlToHref(url: string): string | null {
  try {
    const { href } = new URL(url);
    return href;
  } catch (_err: unknown) {
    return null;
  }
}
