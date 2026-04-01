/**
 * Checks whether a value is a `Promise`.
 * Use it directly, or as a callback with `filter` or `find`.
 *
 * @example
 * values.filter(filterByPromise);
 * values.find(findPromise);
 * isPromise(Promise.resolve());
 */
export default function isPromise(value: unknown): value is Promise<unknown> {
  return value instanceof Promise;
}
