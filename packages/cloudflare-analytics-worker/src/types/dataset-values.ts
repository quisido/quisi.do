import type DatasetValue from './dataset-value';

interface DatasetValues {
  [key: string]: DatasetValues | DatasetValue;
}

export type { DatasetValues as default };
