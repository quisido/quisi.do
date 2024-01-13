import type DatasetValues from '../types/dataset-values.js';
import type Datasets from '../types/datasets.js';
import isDatasetValues from './is-dataset-values.js';
import isObject from './is-object.js';

const SINGLE = 1;

const isDatasetValuesArray = (value: unknown): value is [DatasetValues] =>
  Array.isArray(value) &&
  value.length === SINGLE &&
  value.every(isDatasetValues);

export default function isDatasets(value: unknown): value is Datasets {
  return isObject(value) && Object.values(value).every(isDatasetValuesArray);
}
