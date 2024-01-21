import type StatusCode from '../constants/status-code.js';
import createError from './create-error.js';

/**
 *   Unlike other errors, `assert` errors should be caught and re-thrown,
 * therefore they do not require a `cause`.
 */
export default function assert(
  assertion: boolean,
  message: string,
  status: StatusCode,
  data?: unknown,
): asserts assertion {
  if (assertion) {
    return;
  }

  throw createError(message, status, data);
}
