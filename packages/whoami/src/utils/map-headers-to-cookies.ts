import { parse } from 'cookie';

export default function mapHeadersToCookies(
  headers: Headers,
): Partial<Record<string, string>> {
  const cookies: string | null = headers.get('Cookie');

  if (cookies === null) {
    return {};
  }

  return parse(cookies);
}
