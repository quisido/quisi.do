import assert from './assert';
import isTuple from './is-tuple';

export default function validateTuple<T>(
  value: readonly T[],
  context: readonly string[],
): readonly [T, T] {
  assert(isTuple(value), value, 'a tuple', context);
  return value;
}
