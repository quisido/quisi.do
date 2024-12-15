import { StatusCode } from 'cloudflare-utils';
import CspResponse from './csp-response.js';

export default class InvalidOriginResponse extends CspResponse {
  public constructor(origin: string) {
    super(StatusCode.Forbidden, `The origin "${origin}" is forbidden.`, {
      'access-control-allow-origin': 'null',
    });
  }
}
