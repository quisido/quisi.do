import type DatasetValues from '../types/dataset-values';
import findDatasetValue from './find-dataset-value';
import findObject from './find-object';

export default function findDatasetValues(
  value: unknown,
): value is DatasetValues {
  return findObject(value) && Object.values(value).every(findDatasetValue);
}
