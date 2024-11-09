import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getAuthnIdCookie(
  this: AuthnFetchHandler,
): string | undefined {
  const { cookies } = this;
  const { '__Secure-Authentication-ID': authnId } = cookies;
  return authnId;
}
