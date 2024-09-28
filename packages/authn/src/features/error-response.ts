import { type ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import ErrorResponseInit from './error-response-init.js';

export default class ErrorResponse extends Response {
  public constructor(worker: Worker, code: ErrorCode, returnPath?: string | undefined) {
    super(null, new ErrorResponseInit(worker, code, returnPath));
  }
}
