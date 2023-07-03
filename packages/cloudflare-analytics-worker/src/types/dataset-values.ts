import type DatasetValue from './dataset-value';

interface DatasetValues {
  readonly [key: string]: DatasetValue | DatasetValues;
}

export type { DatasetValues as default };
