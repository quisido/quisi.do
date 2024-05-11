export default function mapHeadersToOrigin(headers: Headers): string | null {
  return headers.get('Origin');
}
