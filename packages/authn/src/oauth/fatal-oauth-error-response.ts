import type { ErrorCode } from '@quisido/authn-shared';
import FatalOAuthErrorResponseInit from './fatal-oauth-error-response-init.js';

interface Options {
  readonly code: ErrorCode;
  readonly host: string;
  readonly returnPath?: string | undefined;
}

export default class FatalOAuthErrorResponse extends Response {
  public constructor({ code, host, returnPath }: Options) {
    super(null, new FatalOAuthErrorResponseInit({ code, host, returnPath }));
  }
}
