import { ErrorCode, isErrorCode } from '@quisido/authn-shared';

export default function mapHashToAuthnErrorCode(
  hash: string,
): ErrorCode | null {
  const result: RegExpExecArray | null =
    /^#authn:error=(?<errorCode>\d+)$/u.exec(hash);
  if (result === null) {
    return null;
  }

  const { groups } = result;

  // Impossible. 😡
  if (typeof groups === 'undefined') {
    throw new Error('Expected groups.');
  }

  const { errorCode } = groups;
  if (isErrorCode(errorCode)) {
    return errorCode;
  }

  return null;
}
