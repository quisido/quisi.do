import HEADERS_INIT from './headers-init.js';

const FAVICON_RESPONSE_INIT: ResponseInit = {
  status: 200,
  headers: new Headers({
    ...HEADERS_INIT,
    'Access-Control-Max-Age': '31536000',
    'Cache-Control': 'immutable, max-age=31536000, public',
    'Content-Type': 'image/x-icon; charset=utf-8',
  }),
};

export default FAVICON_RESPONSE_INIT;
