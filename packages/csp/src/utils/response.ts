import { StatusCode } from 'cloudflare-utils';
import { HEADERS_INIT } from '../constants/headers-init.js';

export default class ResponseImpl extends Response {
  public constructor(
    status: StatusCode,
    headers: HeadersInit | undefined = {},
  ) {
    super(null, {
      status,

      headers: new Headers({
        ...HEADERS_INIT,
        ...headers,
      }),
    });
  }
}
