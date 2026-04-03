/**
 * Returns the value unchanged.
 *
 * @example
 * [1, 2, 3].map(identity);
 */

export default function identity<T>(value: T): T {
  return value;
}
