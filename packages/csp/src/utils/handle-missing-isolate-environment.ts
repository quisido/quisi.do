import { StatusCode } from 'cloudflare-utils';
import { ALLOWED_METHODS_STR } from '../constants/allowed-methods.js';

export default function handleInvalidIsolateEnvironment(): Response {
  return new Response(null, {
    status: StatusCode.InternalServerError,

    headers: new Headers({
      'access-control-allow-headers': 'content-type',
      'access-control-allow-methods': ALLOWED_METHODS_STR,
      'access-control-allow-origin': '*',
      'access-control-max-age': '0',
      allow: ALLOWED_METHODS_STR,
    }),
  });
}
