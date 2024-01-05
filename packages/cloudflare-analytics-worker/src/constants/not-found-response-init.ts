import HEADERS_INIT from './headers-init.js';

const NOT_FOUND_RESPONSE_INIT: ResponseInit = {
  status: 404,
  headers: new Headers({
    ...HEADERS_INIT,
    'Access-Control-Max-Age': '3600',
    'Cache-Control': 'immutable, max-age=3600, public',
  }),
};

export default NOT_FOUND_RESPONSE_INIT;
