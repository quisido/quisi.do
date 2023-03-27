import type DatasetValues from '../types/dataset-values';
import type Datasets from '../types/datasets';
import findDatasetValues from './find-dataset-values';
import isObject from './is-object';

const SINGLE = 1;

const isDatasetValuesArray = (value: unknown): value is [DatasetValues] =>
  Array.isArray(value) &&
  value.length === SINGLE &&
  value.every(findDatasetValues);

export default function findDatasets(value: unknown): value is Datasets {
  return (
    isObject(value) && Object.values(value).every(isDatasetValuesArray)
  );
}
