import HEADERS_INIT from './headers-init.js';

const OPTIONS_HEADERS_INIT: HeadersInit = {
  ...HEADERS_INIT,
  'Access-Control-Max-Age': '3600',
};

export default OPTIONS_HEADERS_INIT;
