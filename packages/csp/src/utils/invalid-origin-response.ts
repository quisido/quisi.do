import { StatusCode } from '../constants/status-code.js';
import Response from './response.js';

export default class InvalidOriginResponse extends Response {
  public constructor() {
    super(StatusCode.Forbidden, {
      'Access-Control-Allow-Origin': 'null',
    });
  }
}
