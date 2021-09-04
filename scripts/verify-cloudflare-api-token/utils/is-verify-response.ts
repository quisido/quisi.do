import type VerifyResponse from '../types/verify-response';

export default function isVerifyResponse(
  value: unknown,
): value is VerifyResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.prototype.hasOwnProperty.call(value, 'errors') &&
    Object.prototype.hasOwnProperty.call(value, 'messages') &&
    Object.prototype.hasOwnProperty.call(value, 'result') &&
    Object.prototype.hasOwnProperty.call(value, 'success')
  );
}
