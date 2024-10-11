import { StatusCode } from 'cloudflare-utils';

export default class InternalServerErrorResponse extends Response {
  public constructor() {
    super(null, {
      status: StatusCode.InternalServerError,

      headers: new Headers({
        'access-control-allow-headers': '*',
        'access-control-allow-methods': '*',
        'access-control-allow-origin': '*',
        'access-control-max-age': '0',
        allow: '*',
      }),
    });
  }
}
