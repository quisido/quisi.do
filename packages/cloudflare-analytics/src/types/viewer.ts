import type Datasets from './datasets.js';

export default interface Viewer {
  readonly accounts?: readonly [Datasets] | undefined;
  readonly budget: number;
  readonly zones?: readonly [Datasets] | undefined;
}
