import type DatasetValue from '../types/dataset-value';
import isNumber from './is-number';
import isObject from './is-object';

const isDatasetNestedValue = (
  value: unknown,
): value is Record<string, number> =>
  isObject(value) && Object.values(value).every(isNumber);

export default function isDatasetValue(
  value: unknown,
): value is DatasetValue {
  return typeof value === 'number' || isDatasetNestedValue(value);
}
