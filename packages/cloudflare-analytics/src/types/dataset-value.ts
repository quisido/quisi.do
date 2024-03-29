import type DatasetDimensionValue from './dataset-dimension-value.js';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type DatasetValue = number | readonly DatasetDimensionValue[];

export type { DatasetValue as default };
