/**
 * Inverts the result of a predicate function.
 *
 * @example
 * values.filter(not(isString));
 */
export default function not<A extends unknown[]>(
  fn: (...args: A) => boolean,
): (...args: A) => boolean {
  return function notF(...args: A): boolean {
    return !fn(...args);
  };
}
