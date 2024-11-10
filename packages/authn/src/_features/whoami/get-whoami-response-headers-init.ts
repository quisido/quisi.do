import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import { SECONDS_PER_MINUTE } from '../../constants/time.js';

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
  this: AuthnFetchHandler,
): HeadersInit {
  const { accessControlAllowOrigin } = this;
  return {
    ...HEADERS_INIT,
    'access-control-allow-origin': accessControlAllowOrigin,
  };
}
