import isObject from './is-object.js';

/**
 * Checks whether a value is an object-like record.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByRecord);
 * values.find(findRecord);
 * isRecord({ id: 1 });
 */
export default function isRecord(
  value: unknown,
): value is Record<number | string | symbol, unknown> {
  return isObject(value);
}
