/**
 * Checks whether a value is a non-null object.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByObject);
 * values.find(findObject);
 * isObject({});
 */
export default function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
