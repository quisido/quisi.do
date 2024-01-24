import type DatasetValue from './dataset-value.js';

interface DatasetValues {
  readonly [key: string]: DatasetValue | DatasetValues;
}

export type { DatasetValues as default };
