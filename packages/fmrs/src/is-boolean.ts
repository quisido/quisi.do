/**
 * Checks whether a value is a boolean.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByBoolean);
 * values.find(findBoolean);
 * isBoolean(true);
 */
export default function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
