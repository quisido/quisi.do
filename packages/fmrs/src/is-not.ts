import is from './is.js';
import not from './not.js';

/**
 * Creates a predicate that returns `true` when its input does not equal `value`.
 *
 * @example
 * values.filter(isNot(0));
 * values.filter(isNotEqualTo('draft'));
 */
export default function isNot<T>(value: T): (value: T) => boolean {
  return not(is(value));
}
