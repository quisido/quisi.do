import EMPTY_ARRAY from '../constants/empty-array.js';
import assert from './assert.js';

export default function validateBoolean(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): boolean {
  assert(typeof value === 'boolean', value, 'a boolean', context);
  return value;
}
