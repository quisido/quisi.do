import { type IncomingRequest } from 'cloudflare-utils';

export default function mapSessionIdToRequest(
  sessionId: string,
): IncomingRequest {
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
