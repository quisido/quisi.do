import type VerifyResponse from '../types/verify-response';
import mapVerifyResponseErrorToString from '../utils/map-verify-response-error-to-string';

export default function mapVerifyResponseToErrorString(
  response: VerifyResponse,
): string {
  return response.errors.map(mapVerifyResponseErrorToString).join('\n');
}
