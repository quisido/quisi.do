import type DatasetValue from '../types/dataset-value.js';
import type DatasetValues from '../types/dataset-values.js';
import isObject from './is-object.js';

const isEntry = (
  entry: readonly [string, unknown],
): entry is [string, DatasetValue | DatasetValues] => {
  const [key, value] = entry;
  switch (key) {
    case 'key':
      return typeof value === 'number' || typeof value === 'string';
    default:
      // We need to hoist here so that all 3 functions can reference each other.
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return isDatasetValue(value);
  }
};

const isRecord = (
  value: unknown,
): value is Record<string, DatasetValues | DatasetValue> => {
  return isObject(value) && Object.entries(value).every(isEntry);
};

export default function isDatasetValue(
  value: unknown,
): value is DatasetValue | DatasetValues {
  if (typeof value === 'number') {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isRecord);
  }

  return isRecord(value);
}
