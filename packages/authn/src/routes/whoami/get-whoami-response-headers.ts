import getWhoAmIResponseHeadersInit from './get-whoami-response-headers-init.js';

export default function getWhoAmIResponseHeaders(): HeadersInit {
  const init: HeadersInit = getWhoAmIResponseHeadersInit();
  return new Headers(init);
}
