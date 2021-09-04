import type VerifyResponseError from '../types/verify-response-error';

export default function mapVerifyResponseErrorToString(
  err: VerifyResponseError,
): string {
  return `❌ ${err.message} (${err.code})`;
}
