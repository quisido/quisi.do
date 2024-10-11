import type Worker from '@quisido/worker';
import { SECONDS_PER_DAY } from '../constants/time.js';
import getCookieDomain from './get-cookie-domain.js';
import getHost from './get-host.js';

interface Options {
  readonly authnId: string;
  readonly returnPath: string;
}

export default function createResponseHeaders(
  this: Worker,
  { authnId, returnPath }: Options,
): Headers {
  const cookieDomain: string = getCookieDomain.call(this);
  const host: string = getHost.call(this);

  return new Headers({
    'content-location': `https://${host}${returnPath}`,
    location: `https://${host}${returnPath}`,
    'set-cookie': [
      `__Secure-Authentication-ID=${authnId}`,
      `Domain=${cookieDomain}`,
      `Max-Age=${SECONDS_PER_DAY.toString()}`,
      'Partitioned',
      'Path=/',
      'SameSite=Lax',
      'Secure',
    ].join('; '),
  });
}
