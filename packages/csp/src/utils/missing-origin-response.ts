import { StatusCode } from '../constants/status-code.js';
import Response from './response.js';

export default class MissingOriginResponse extends Response {
  public constructor() {
    super(StatusCode.BadRequest, {
      'Access-Control-Allow-Origin': 'null',
      'Access-Control-Max-Age': '31536000',
    });
  }
}
