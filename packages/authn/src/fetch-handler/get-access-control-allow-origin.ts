import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default function getAccessControlAllowOrigin(
  this: AuthnFetchHandler,
): string {
  if (this.origin === null) {
    return '*';
  }

  /**
   * Allow `localhost` for Lighthouse reports in CI.
   * The HTTP protocol is for `serve`; the HTTPS protocol is for `dev`.
   */
  if (
    this.origin === 'http://localhost:3000' ||
    this.origin === 'https://localhost:3000'
  ) {
    return this.origin;
  }

  return `https://${this.cookieDomain}`;
}
