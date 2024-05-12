import { ALLOWED_METHODS_STR } from "./allowed-methods.js";

export const HEADERS_INIT: HeadersInit = {
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': ALLOWED_METHODS_STR,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Max-Age': '0',
  Allow: ALLOWED_METHODS_STR,
};
