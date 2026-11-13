import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { SECONDS_PER_DAY } from '../constants/time.js';

const EXPIRED = 0;

export default function createAuthenticationCookie(
  this: AuthnFetchHandler,
  token: string,
): string {
  const maxAge: number = token === '' ? EXPIRED : SECONDS_PER_DAY;
  return [
    `__Secure-Authentication-ID=${token}`,
    `Domain=${this.cookieDomain}`,
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'Partitioned',
    'Path=/',
    'SameSite=Lax',
    'Secure',
  ].join('; ');
}
