import type Cause from '../types/cause.js';
import isErrorCode from './is-error-code.js';
import isObject from './is-object.js';

export default function isCause(value: unknown): value is Cause {
  return (
    isObject(value) &&
    // code
    'code' in value &&
    isErrorCode(value['code'])
  );
}
