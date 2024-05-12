export default function mapSessionIdToRequest(sessionId: string): Request {
  const search: string = new URLSearchParams({
    state: JSON.stringify({
      returnPath: '/',
      sessionId,
    }),
  }).toString();

  return new Request(`https://localhost/authn/?${search}`, {
    headers: new Headers({
      Cookie: `__Secure-Session-ID=${sessionId}`,
    }),
  });
}
