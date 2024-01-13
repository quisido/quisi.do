import type Result from '../types/result.js';
import isResult from './is-result.js';

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
