import ErrorCode from '../constants/error-code.js';
import type Cause from '../types/cause.js';
import isObject from './is-object.js';

const ERROR_CODES: Set<unknown> = new Set(Object.values(ErrorCode));
const isErrorCode = (value: unknown): value is ErrorCode =>
  ERROR_CODES.has(value);

export default function isCause(value: unknown): value is Cause {
  return (
    isObject(value) &&
    'code' in value &&
    isErrorCode(value.code) &&
    'data' in value &&
    (!('returnHref' in value) ||
      typeof value.returnHref === 'string' ||
      typeof value.returnHref === 'undefined') &&
    'status' in value &&
    typeof value.status === 'number'
  );
}
