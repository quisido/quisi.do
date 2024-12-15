import is from './is.js';
import not from './not.js';

export default function isNot<T>(value: T): (value: T) => boolean {
  return not(is(value));
}
