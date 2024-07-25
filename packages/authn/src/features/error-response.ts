import { type ErrorCode } from '@quisido/authn-shared';
import ErrorResponseInit from './error-response-init.js';

export default class ErrorResponse extends Response {
  public constructor(code: ErrorCode, returnPath?: string | undefined) {
    super(null, new ErrorResponseInit(code, returnPath));
  }
}
