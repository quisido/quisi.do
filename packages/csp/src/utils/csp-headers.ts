import { HEADERS_INIT } from '../constants/headers-init.js';

export default class CspHeaders extends Headers {
  public constructor(headers: HeadersInit | undefined = {}) {
    super({
      ...HEADERS_INIT,
      ...headers,
    });
  }
}
