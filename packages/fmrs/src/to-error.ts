import toString from './to-string.js';

/**
 * Converts any value into an `Error`.
 * Existing `Error` instances are returned unchanged.
 *
 * @example
 * const error = toError(reason);
 */
export default function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  const message: string = toString(value);
  return new Error(message);
}
