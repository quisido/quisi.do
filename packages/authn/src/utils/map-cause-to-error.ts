import { ErrorCode } from '@quisido/authn-shared';
import type Cause from '../types/cause.js';

export default function mapCauseToError(cause: Cause): Error {
  const { code } = cause;
  return new Error(`${ErrorCode[code]}#${code.toString()}`, { cause });
}
