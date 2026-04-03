/**
 * Checks whether a value is not `undefined`.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByDefined);
 * values.find(findDefined);
 * isDefined(value);
 */
export default function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}
