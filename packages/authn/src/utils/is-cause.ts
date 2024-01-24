import type Cause from '../types/cause.js';
import isObject from './is-object.js';

export default function isCause(value: unknown): value is Cause {
  return (
    isObject(value) &&
    'data' in value &&
    'status' in value &&
    typeof value.status === 'number'
  );
}
