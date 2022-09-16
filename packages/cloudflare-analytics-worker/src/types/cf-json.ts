/* eslint-disable @typescript-eslint/no-type-alias */
import type DatasetDimensionValue from './dataset-dimension-value';

type Value =
  | Record<string, number | undefined>
  | number
  | readonly DatasetDimensionValue[]
  | undefined;

export default interface CfJson {
  readonly budget: number;
  readonly datasets: Record<
    string,
    Record<string, Value | undefined> | undefined
  >;
}
