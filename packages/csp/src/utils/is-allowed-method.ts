import {
  type AllowedMethod,
  ALLOWED_METHODS_ARR,
} from '../constants/allowed-methods.js';

export const ALLOWED_METHODS_SET = new Set<string>(ALLOWED_METHODS_ARR);

export default function isAllowedMethod(
  method: string,
): method is AllowedMethod {
  return ALLOWED_METHODS_SET.has(method);
}
