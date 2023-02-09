import type Datasets from './datasets';

export default interface Viewer {
  readonly accounts: [Datasets];
  readonly budget: number;
}
