import { ErrorCode } from './error-code.js';

const ERROR_CODES: Set<unknown> = new Set<unknown>(Object.values(ErrorCode));

export default function isErrorCode(value: unknown): value is ErrorCode {
  return ERROR_CODES.has(value);
}
