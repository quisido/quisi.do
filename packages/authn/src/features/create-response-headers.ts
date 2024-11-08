import { SECONDS_PER_DAY } from '../constants/time.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

interface Options {
  readonly authnId: string;
  readonly returnPath: string;
}

export default function createResponseHeaders(
  this: AuthnFetchHandler,
  { authnId, returnPath }: Options,
): Headers {
  const { host } = this;

  return new Headers({
    'content-location': `https://${host}${returnPath}`,
    location: `https://${host}${returnPath}`,
    'set-cookie': [
      `__Secure-Authentication-ID=${authnId}`,
      `Domain=${this.cookieDomain}`,
      `Max-Age=${SECONDS_PER_DAY.toString()}`,
      'Partitioned',
      'Path=/',
      'SameSite=Lax',
      'Secure',
    ].join('; '),
  });
}
