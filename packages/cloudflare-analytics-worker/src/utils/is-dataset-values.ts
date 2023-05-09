import type DatasetValues from '../types/dataset-values';
import isDatasetValue from './is-dataset-value';
import isObject from './is-object';

export default function isDatasetValues(
  value: unknown,
): value is DatasetValues {
  return isObject(value) && Object.values(value).every(isDatasetValue);
}
