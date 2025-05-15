import EMPTY_ARRAY from '../constants/empty-array.js';
import assert from './assert.js';
import isArray from './is-array.js';

export default function validateArray<T>(
  arr: unknown,
  validateItem: (item: unknown, context: readonly string[]) => T,
  context: readonly string[] = EMPTY_ARRAY,
): T[] {
  assert(isArray(arr), arr, 'an array', context);

  const isValidItem = (item: unknown, index: number): item is T => {
    validateItem(item, [...context, index.toString()]);
    return true;
  };

  assert(arr.every(isValidItem), null, '');
  return arr;
}
