import { ResponseInitImpl, type StatusCode } from 'cloudflare-utils';
import { ACCESS_CONTROL_HEADERS_INIT } from '../constants/access-control-headers-init.js';

interface Options {
  readonly accessControlAllowOrigin: string;
}

export default class AnalyticsResponseInit extends ResponseInitImpl {
  public constructor(
    status: StatusCode,
    { accessControlAllowOrigin }: Options,
  ) {
    super({
      headers: new Headers({
        ...ACCESS_CONTROL_HEADERS_INIT,
        'access-control-allow-origin': accessControlAllowOrigin,
        'content-type': 'text/json; charset=utf-8',
      }),
      status,
    });
  }
}
