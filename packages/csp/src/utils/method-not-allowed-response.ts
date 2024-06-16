import { StatusCode } from '../constants/status-code.js';
import Response from './response.js';

export default class MethodNotAllowedResponse extends Response {
  public constructor() {
    super(StatusCode.MethodNotAllowed, {
      'Access-Control-Max-Age': '31536000',
    });
  }
}
