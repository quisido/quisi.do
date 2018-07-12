import assert from './assert.js';
import isTuple from './is-tuple.js';

export default function validateTuple<T>(
  value: readonly T[],
  context: readonly string[],
): readonly [T, T] {
  assert(isTuple(value), value, 'a tuple', context);
  return value;
}
