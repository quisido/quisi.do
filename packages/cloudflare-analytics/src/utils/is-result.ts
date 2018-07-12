import type Result from '../types/result.js';
import isObject from './is-object.js';
import isResultData from './is-result-data.js';

export default function isResult(value: unknown): value is Result {
  return (
    isObject(value) &&
    'data' in value &&
    isResultData(value.data) &&
    'errors' in value
  );
}
