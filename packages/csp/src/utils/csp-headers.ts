import { HEADERS_INIT } from '../constants/headers-init.js';

export default class CspHeaders extends Headers {
  public constructor(headers: Record<string, string> | undefined = {}) {
    super({
      ...HEADERS_INIT,
      ...headers,
    });
  }
}
