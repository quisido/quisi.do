import type DatasetValue from '../types/dataset-value';
import findObject from './find-object';

const findNumber = (value: unknown): value is number =>
  typeof value === 'number';

const findDatasetNestedValue = (
  value: unknown,
): value is Record<string, number> =>
  findObject(value) && Object.values(value).every(findNumber);

export default function findDatasetValue(
  value: unknown,
): value is DatasetValue {
  return typeof value === 'number' || findDatasetNestedValue(value);
}
