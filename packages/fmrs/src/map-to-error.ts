import mapToString from './map-to-string.js';

/**
 * Converts any value into an `Error`.
 * Existing `Error` instances are returned unchanged.
 *
 * @example
 * promise.catch(mapToError);
 * const error = toError(reason);
 */
export default function mapToError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  const message: string = mapToString(value);
  return new Error(message);
}
