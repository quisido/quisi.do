import type StatusCode from '../constants/status-code.js';
import type Cause from '../types/cause.js';

export default function createError(
  message: string,
  status: StatusCode,
  data?: unknown,
): Error {
  return new Error(message, {
    cause: {
      data,
      status,
    } satisfies Cause,
  });
}
