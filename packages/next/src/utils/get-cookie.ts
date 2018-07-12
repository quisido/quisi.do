export default function getCookie(key: string): string | null {
  const cookies: readonly string[] = window.document.cookie.split(/;\s*/);

  const targetCookieName = `__Secure-${key}`;
  for (const cookie of cookies) {
    const [cookieName, ...value] = cookie.split('=');
    if (cookieName !== targetCookieName) {
      continue;
    }

    return value.join('=');
  }

  return null;
}
