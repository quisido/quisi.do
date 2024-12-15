import { StatusCode } from 'cloudflare-utils';
import CspResponse from './csp-response.js';

export default class MissingOriginResponse extends CspResponse {
  public constructor() {
    super(StatusCode.BadRequest, null, {
      'access-control-allow-origin': 'null',
      'access-control-max-age': '31536000',
    });
  }
}
