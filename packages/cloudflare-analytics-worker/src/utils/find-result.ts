import type Result from '../types/result';
import findObject from './find-object';
import findResultData from './find-result-data';

export default function findResult(value: unknown): value is Result {
  return (
    findObject(value) &&
    'data' in value &&
    findResultData(value.data) &&
    'errors' in value
  );
}
