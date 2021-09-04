import type VerifyResponseError from '../types/verify-response-error';
import type VerifyResponseMessage from '../types/verify-response-message';
import type VerifyResponseResult from '../types/verify-response-result';

export default interface VerifyResponse {
  readonly errors: readonly VerifyResponseError[];
  readonly messages: readonly VerifyResponseMessage[];
  readonly result: VerifyResponseResult | null;
  readonly success: boolean;
}
