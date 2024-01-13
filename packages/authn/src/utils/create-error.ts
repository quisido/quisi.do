import type Cause from '../types/cause.js';

export default function createError(
  message: string,
  data: unknown,
  status: number,
): Error {
  return new Error(message, {
    cause: {
      data,
      status,
    } satisfies Cause,
  });
}
