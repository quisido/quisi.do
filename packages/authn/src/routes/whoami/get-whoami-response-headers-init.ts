import type Worker from '@quisido/worker';
import { SECONDS_PER_MINUTE } from '../../constants/time.js';
import getAccessControlAllowOrigin from '../../features/get-access-control-allow-origin.js';

const MAX_AGE_MINUTES = 10;

const HEADERS_INIT: HeadersInit = {
  'access-control-allow-credentials': 'true',
  'access-control-allow-headers': 'Baggage, Sentry-Trace',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-max-age': (MAX_AGE_MINUTES * SECONDS_PER_MINUTE).toString(),
  allow: 'GET, OPTIONS',
  'content-type': 'text/json; charset=utf-8',
};

export default function getWhoAmIResponseHeadersInit(
  this: Worker,
): HeadersInit {
  return {
    ...HEADERS_INIT,
    'access-control-allow-origin': getAccessControlAllowOrigin.call(this),
  };
}
