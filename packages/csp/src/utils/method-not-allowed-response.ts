import { StatusCode } from 'cloudflare-utils';
import CspResponse from './csp-response.js';

export default class MethodNotAllowedResponse extends CspResponse {
  public constructor(method: string) {
    super(StatusCode.MethodNotAllowed, `Method "${method}" not allowed.`, {
      'access-control-max-age': '31536000',
    });
  }
}
