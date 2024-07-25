import { StatusCode } from 'cloudflare-utils';
import Response from './response.js';

export default class MissingOriginResponse extends Response {
  public constructor() {
    super(StatusCode.BadRequest, {
      'access-control-allow-origin': 'null',
      'access-control-max-age': '31536000',
    });
  }
}
