/* eslint-disable @typescript-eslint/no-type-alias */

type DatasetDimensionValue<
  K extends number | string = number | string,
  V extends string = string,
> = WithKey<K, Readonly<Record<V, number>>>;

type WithKey<K extends number | string, T> = HasKey<K> & T;

interface HasKey<K extends number | string> {
  readonly key: K;
}

export type { DatasetDimensionValue as default };
