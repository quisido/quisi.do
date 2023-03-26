import type Result from '../types/result';
import isResult from './is-result';

export default function validateResult(value: unknown): Result {
  if (!isResult(value)) {
    throw new Error(
      `Expected a result, but received ${typeof value} ${JSON.stringify(
        value,
      )}.`,
    );
  }

  return value;
}
