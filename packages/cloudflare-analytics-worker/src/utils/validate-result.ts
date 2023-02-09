import type Result from '../types/result';
import findResult from './find-result';

export default function validateResult(value: unknown): Result {
  if (!findResult(value)) {
    throw new Error(
      `Expected a result, but received ${typeof value} ${JSON.stringify(
        value,
      )}.`,
    );
  }

  return value;
}
