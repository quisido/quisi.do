import { StatusCode } from 'cloudflare-utils';
import Response from './response.js';

export default class InvalidOriginResponse extends Response {
  public constructor() {
    super(StatusCode.Forbidden, {
      'access-control-allow-origin': 'null',
    });
  }
}
