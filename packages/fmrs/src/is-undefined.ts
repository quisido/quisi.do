/**
 * Checks whether a value is `undefined`.
 * Use it directly, or as a callback with `filter`.
 *
 * @example
 * values.filter(filterByUndefined);
 * isUndefined(value);
 */
export default function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
