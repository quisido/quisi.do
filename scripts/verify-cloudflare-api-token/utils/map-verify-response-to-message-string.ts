import type VerifyResponse from '../types/verify-response';
import mapVerifyResponseMessageToString from '../utils/map-verify-response-message-to-string';

export default function mapVerifyResponseToMessageString(
  response: VerifyResponse,
): string {
  return response.messages.map(mapVerifyResponseMessageToString).join('\n');
}
