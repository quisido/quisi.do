import { ALLOWED_METHODS_SET } from "../constants/allowed-methods.js";

export default function isAllowedMethod(
  method: string,
): method is 'GET' | 'OPTIONS' | 'POST' {
  return ALLOWED_METHODS_SET.has(method);
}
