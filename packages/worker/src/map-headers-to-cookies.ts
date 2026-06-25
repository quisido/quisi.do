import { parseCookie } from 'cookie';

export default function mapHeadersToCookies(
  headers: Headers,
): Partial<Record<string, string>> {
  const cookies: string | null = headers.get('Cookie');

  if (cookies === null) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(parseCookie(cookies)).filter(
      (entry): entry is [string, string] => {
        const [, value] = entry;
        return typeof value === 'string';
      },
    ),
  );
}
