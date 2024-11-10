import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import getWhoAmIResponseHeadersInit from './get-whoami-response-headers-init.js';

export default function getWhoAmIResponseHeaders(
  this: AuthnFetchHandler,
): HeadersInit {
  const init: HeadersInit = getWhoAmIResponseHeadersInit.call(this);
  return new Headers(init);
}
