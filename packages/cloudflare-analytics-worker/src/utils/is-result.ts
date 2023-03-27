import type Result from '../types/result';
import isObject from './is-object';
import isResultData from './is-result-data';

export default function isResult(value: unknown): value is Result {
  return (
    isObject(value) &&
    'data' in value &&
    isResultData(value.data) &&
    'errors' in value
  );
}
