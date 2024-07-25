import { StatusCode } from 'cloudflare-utils';
import Response from './response.js';

export default class MethodNotAllowedResponse extends Response {
  public constructor() {
    super(StatusCode.MethodNotAllowed, {
      'access-control-max-age': '31536000',
    });
  }
}
