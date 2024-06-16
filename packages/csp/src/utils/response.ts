import { HEADERS_INIT } from '../constants/headers-init.js';
import { StatusCode } from '../constants/status-code.js';

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
