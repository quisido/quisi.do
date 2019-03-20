/**
 *   You can only construct a `Response` during a request, so we must keep these
 * parameters unconstructed for now.
 *
 * https://dev.to/kleeut/
 *   cloudflare-workers-some-functionality-can-only-
 *   be-performed-while-handling-a-request-3bne
 */

export const FAVICON_RESPONSE_BODY: BodyInit =
  '%00%00%01%00%01%00%01%01%00%00%01%00%20%000%00%00%00%16%00%00%00(%00%00%00%01%00%00%00%02%00%00%00%01%00%20%00%00%00%00%00%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00';

export const FAVICON_RESPONSE_INIT: ResponseInit = {
  status: 200,
  headers: new Headers({
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '31536000',
    Allow: 'GET, OPTIONS',
    'Cache-Control': 'immutable, max-age=31536000, public',
    'Content-Type': 'image/x-icon; charset=utf-8',
  }),
};

export const ROBOTS_RESPONSE_BODY: BodyInit = 'Disallow: *';
export const ROBOTS_RESPONSE_INIT: ResponseInit = {
  status: 200,
  headers: new Headers({
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Max-Age': '31536000',
    Allow: 'GET, OPTIONS',
    'Cache-Control': 'immutable, max-age=31536000, public',
    'Content-Type': 'text/plain; charset=utf-8',
  }),
};
