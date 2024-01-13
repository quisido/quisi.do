import HEADERS_INIT from './headers-init.js';

const METHOD_NOT_ALLOWED_RESPONSE_INI: ResponseInit = {
  status: 405,
  headers: new Headers({
    ...HEADERS_INIT,
    'Access-Control-Max-Age': '3600',
    'Cache-Control': 'immutable, max-age=3600, public',
  }),
};

export default METHOD_NOT_ALLOWED_RESPONSE_INI;
