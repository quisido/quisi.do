import type Datasets from './datasets';

export default interface Viewer {
  readonly accounts?: [Datasets] | undefined;
  readonly budget: number;
  readonly zones?: [Datasets] | undefined;
}
