import { ALLOWED_METHODS_STR } from './allowed-methods.js';

export const HEADERS_INIT: HeadersInit = {
  'access-Control-allow-headers': 'content-type',
  'access-Control-allow-methods': ALLOWED_METHODS_STR,
  'access-control-allow-origin': '*',
  'access-control-max-age': '0',
  allow: ALLOWED_METHODS_STR,
};
