import { StatusCode } from 'cloudflare-utils';

const BODY: BodyInit =
  '%00%00%01%00%01%00%01%01%00%00%01%00%20%000%00%00%00%16%00%00%00(%00%00%00%01%00%00%00%02%00%00%00%01%00%20%00%00%00%00%00%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00';

const INIT: ResponseInit = {
  status: StatusCode.OK,

  headers: new Headers({
    'access-control-allow-methods': 'GET',
    'access-control-max-age': '31536000',
    allow: 'GET',
    'cache-control': 'immutable, max-age=31536000, public',
    'content-type': 'image/x-icon; charset=utf-8',
  }),
};

export default class FaviconResponse extends Response {
  public constructor() {
    super(BODY, INIT);
  }
}
