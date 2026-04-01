/**
 * Checks whether a value is a string.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByString);
 * values.find(findString);
 * isString('hello');
 */
export default function isString(value: unknown): value is string {
  return typeof value === 'string';
}
