import { StatusCode } from 'cloudflare-utils';
import Response from './response.js';

export default class InvalidPathnameResponse extends Response {
  public constructor() {
    super(StatusCode.NotFound, {
      'access-control-max-age': '31536000',
    });
  }
}
