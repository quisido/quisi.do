/**
 * Creates a predicate that returns `true` when its input equals `value`.
 *
 * @example
 * values.filter(is(0));
 * values.filter(isEqualTo('published'));
 */
export default function is(value: unknown): (value: unknown) => boolean {
  return function isValue(value2: unknown): boolean {
    return value === value2;
  };
}
