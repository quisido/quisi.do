import type DatasetValue from '../types/dataset-value';
import type DatasetValues from '../types/dataset-values';
import isObject from './is-object';

class Validator {
  public static is = (
    value: unknown,
  ): value is DatasetValue | DatasetValues => {
    if (typeof value === 'number') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(Validator.isRecord);
    }

    return Validator.isRecord(value);
  };

  public static isEntry = (
    entry: readonly [string, unknown],
  ): entry is [string, DatasetValue | DatasetValues] => {
    const [key, value] = entry;
    switch (key) {
      case 'key':
        return typeof value === 'number' || typeof value === 'string';
      default:
        return Validator.is(value);
    }
  };

  public static isRecord = (
    value: unknown,
  ): value is Record<string, DatasetValues | DatasetValue> => {
    return isObject(value) && Object.entries(value).every(Validator.isEntry);
  };
}

export default function isDatasetValue(
  value: unknown,
): value is DatasetValue | DatasetValues {
  return Validator.is(value);
}
