import type VerifyResponseMessage from '../types/verify-response-message';

export default function mapVerifyResponseMessageToString({
  code,
  message,
  type,
}: VerifyResponseMessage): string {
  if (type === null) {
    return `✔ ${message} (${code})`;
  }
  return `✔ [${type}] ${message} (${code})`;
}
