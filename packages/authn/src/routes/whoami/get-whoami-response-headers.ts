import Worker from '@quisido/worker';
import getWhoAmIResponseHeadersInit from './get-whoami-response-headers-init.js';

export default function getWhoAmIResponseHeaders(this: Worker): HeadersInit {
  const init: HeadersInit = getWhoAmIResponseHeadersInit.call(this);
  return new Headers(init);
}
