import EMPTY_ARRAY from '../constants/empty-array';
import assert from './assert';

export default function validateString(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): string {
  assert(typeof value === 'string', value, 'a string', context);
  return value;
}
