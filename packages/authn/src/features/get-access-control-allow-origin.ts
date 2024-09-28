import type Worker from '@quisido/worker';
import getCookieDomain from './get-cookie-domain.js';

export default function getAccessControlAllowOrigin(this: Worker): string {
  const headers: Headers = this.getRequestHeaders();

  /**
   * Allow `localhost` for Lighthouse reports in CI.
   * The HTTP protocol is for `serve`; the HTTPS protocol is for `dev`.
   */
  const origin: string | null = headers.get('origin');
  if (origin === null) {
    return '*';
  }

  if (
    origin === 'http://localhost:3000' ||
    origin === 'https://localhost:3000'
  ) {
    return origin;
  }

  const cookieDomain: string = getCookieDomain.call(this);
  return `https://${cookieDomain}`;
}
