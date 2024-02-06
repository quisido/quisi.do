import type ErrorCode from '../constants/error-code.js';
import StatusCode from '../constants/status-code.js';
import createError from './create-error.js';

export default function parseJson(
  value: string,
  errorCode: ErrorCode,
): unknown {
  try {
    return JSON.parse(value);
  } catch (err: unknown) {
    throw createError(
      'Expected JSON.',
      errorCode,
      StatusCode.BadRequest,
      value,
    );
  }
}
