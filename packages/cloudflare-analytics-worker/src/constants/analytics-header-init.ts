import HEADERS_INIT from './headers-init';

const ANALYTICS_HEADERS_INIT: HeadersInit = {
  ...HEADERS_INIT,
  'Access-Control-Max-Age': '3600',
  'Cache-Control': 'immutable, max-age=3600, public',
  'Content-Type': 'application/json',
};

export default ANALYTICS_HEADERS_INIT;
