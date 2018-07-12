import { isErrorCode } from '@quisido/authn-shared';
import type Cause from '../types/cause.js';
import isObject from './is-object.js';

export default function isCause(value: unknown): value is Cause {
  return (
    isObject(value) &&
    // code
    'code' in value &&
    isErrorCode(value['code'])
  );
}
