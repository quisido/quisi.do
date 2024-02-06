import type ErrorCode from '../constants/error-code.js';
import type StatusCode from '../constants/status-code.js';
import type Cause from '../types/cause.js';

export default function createError(
  message: string,
  code: ErrorCode,
  status: StatusCode,
  data?: unknown,
  returnHref?: string | undefined,
): Error {
  return new Error(message, {
    cause: {
      code,
      data,
      returnHref,
      status,
    } satisfies Cause,
  });
}
