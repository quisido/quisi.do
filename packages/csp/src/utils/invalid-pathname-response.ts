import { StatusCode } from "../constants/status-code.js";
import Response from './response.js';

export default class InvalidPathnameResponse extends Response {
  public constructor() {
    super(StatusCode.NotFound, {
      'Access-Control-Max-Age': '31536000',
    });
  }
}
