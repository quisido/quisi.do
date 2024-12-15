import { StatusCode } from 'cloudflare-utils';

const BODY: BodyInit = `User-agent: *
Disallow: *`;

const INIT: ResponseInit = {
  status: StatusCode.OK,

  headers: new Headers({
    'access-control-allow-methods': 'GET',
    'access-control-max-age': '31536000',
    allow: 'GET',
    'cache-control': 'immutable, max-age=31536000, public',
    'content-type': 'text/plain; charset=utf-8',
  }),
};

export default class RobotsResponse extends Response {
  public constructor() {
    super(BODY, INIT);
  }
}
