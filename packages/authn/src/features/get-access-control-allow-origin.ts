import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getAccessControlAllowOrigin(
  this: AuthnFetchHandler,
): string {
  const { origin } = this;
  if (origin === null) {
    return '*';
  }
  /**
   * Allow `localhost` for Lighthouse reports in CI.
   * The HTTP protocol is for `serve`; the HTTPS protocol is for `dev`.
   */

  if (
    origin === 'http://localhost:3000' ||
    origin === 'https://localhost:3000'
  ) {
    return origin;
  }

  const { cookieDomain } = this;
  return `https://${cookieDomain}`;
}
