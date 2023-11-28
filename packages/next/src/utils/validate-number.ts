import EMPTY_ARRAY from '../constants/empty-array.js';
import assert from './assert.js';

export default function validateNumber(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): number {
  assert(typeof value === 'number', value, 'a number', context);
  return value;
}
