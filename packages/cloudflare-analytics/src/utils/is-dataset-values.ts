import type DatasetValues from '../types/dataset-values.js';
import isDatasetValue from './is-dataset-value.js';
import isObject from './is-object.js';

export default function isDatasetValues(
  value: unknown,
): value is DatasetValues {
  return isObject(value) && Object.values(value).every(isDatasetValue);
}
