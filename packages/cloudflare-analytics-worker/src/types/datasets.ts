import type DatasetValues from './dataset-values';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type Datasets = Readonly<Record<string, readonly [DatasetValues]>>;

export type { Datasets as default };
