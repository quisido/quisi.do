import CachedHeaders from './cached-headers.js';
import { StatusCode } from './status-code.js';
import TransparentIcoResponse from './transparent-ico-response.js';

export default class FaviconIcoResponse extends TransparentIcoResponse {
  constructor({ headers, ...init }: ResponseInit = {}) {
    super({
      headers: new CachedHeaders(headers),
      ...init,
      status: StatusCode.OK,
    });
  }
}
