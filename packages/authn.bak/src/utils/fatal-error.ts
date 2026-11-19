import { ErrorCode } from '@quisido/authn-shared';

export default class FatalError extends Error {
  override readonly cause: ErrorCode;

  public constructor(code: ErrorCode) {
    super(`${ErrorCode[code]}#${code.toString()}`, {
      cause: code,
    });

    this.cause = code;
  }
}
