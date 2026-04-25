/**
 * Checks whether a value is a number.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByNumber);
 * values.find(findNumber);
 * isNumber(42);
 */
export default function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
