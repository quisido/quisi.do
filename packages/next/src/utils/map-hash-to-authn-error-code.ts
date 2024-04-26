import { ErrorCode, isErrorCode } from '@quisido/authn-shared';

export default function mapHashToAuthnErrorCode(
  hash: string,
): ErrorCode | null {
  const result: RegExpExecArray | null = /^#authn:error=(\d+)$/u.exec(hash);
  if (result === null) {
    return null;
  }

  const [, errorCode] = result;
  if (isErrorCode(errorCode)) {
    return errorCode;
  }

  return null;
}
