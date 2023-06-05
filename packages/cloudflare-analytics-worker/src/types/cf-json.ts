import type DatasetDimensionValue from './dataset-dimension-value';

type Value =
  | readonly DatasetDimensionValue[]
  | Record<string, number | undefined>
  | number
  | undefined;

export default interface CfJson {
  readonly budget: number;
  readonly datasets: Record<
    string,
    Record<string, Value | undefined> | undefined
  >;
}
