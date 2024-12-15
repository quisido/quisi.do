import { StatusCode } from 'cloudflare-utils';
import CspResponse from './csp-response.js';

export default class NotFoundResponse extends CspResponse {
  public constructor(pathname: string) {
    super(StatusCode.NotFound, `The pathname "${pathname}" does not exist.`, {
      'access-control-max-age': '31536000',
    });
  }
}
