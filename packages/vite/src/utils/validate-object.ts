import { isRecord, mapObjectToKeys } from 'fmrs';
import EMPTY_ARRAY from '../constants/empty-array.js';
import assert from './assert.js';

type Validator<T> = {
  [K in keyof T]: (value: unknown, context: readonly string[]) => T[K];
};

export default function validateObject<T>(
  value: unknown,
  validator: Validator<T>,
  context: readonly string[] = EMPTY_ARRAY,
): T {
  assert(isRecord(value), value, 'an object', context);

  for (const key of mapObjectToKeys(validator)) {
    validator[key](value[key], [...context, key.toString()]);
  }

  return value as T;
}
