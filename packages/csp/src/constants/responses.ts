/**
 *   You can only construct a `Response` during a request, so we must keep these
 * parameters deconstructed for now.
 *
 * https://dev.to/kleeut/
 *   cloudflare-workers-some-functionality-can-only-
 *   be-performed-while-handling-a-request-3bne
 */

import { StatusCode } from 'cloudflare-utils';

export const FAVICON_RESPONSE_BODY: BodyInit =
  '%00%00%01%00%01%00%01%01%00%00%01%00%20%000%00%00%00%16%00%00%00(%00%00%00%01%00%00%00%02%00%00%00%01%00%20%00%00%00%00%00%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00';

export const FAVICON_RESPONSE_INIT: ResponseInit = {
  status: StatusCode.OK,

  headers: new Headers({
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-max-age': '31536000',
    allow: 'GET, OPTIONS',
    'cache-control': 'immutable, max-age=31536000, public',
    'content-type': 'image/x-icon; charset=utf-8',
  }),
};

export const ROBOTS_RESPONSE_BODY: BodyInit = `User-agent: *
Disallow: *`;

export const ROBOTS_RESPONSE_INIT: ResponseInit = {
  status: StatusCode.OK,

  headers: new Headers({
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-max-age': '31536000',
    allow: 'GET, OPTIONS',
    'cache-control': 'immutable, max-age=31536000, public',
    'content-type': 'text/plain; charset=utf-8',
  }),
};
