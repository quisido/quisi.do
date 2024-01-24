import HEADERS_INIT from './headers-init.js';

const ERRORS_HEADERS_INIT: HeadersInit = {
  ...HEADERS_INIT,
  'Access-Control-Max-Age': '0',
  'Cache-Control': 'immutable, max-age=0, public',
  'Content-Type': 'application/json',
};

export default ERRORS_HEADERS_INIT;
