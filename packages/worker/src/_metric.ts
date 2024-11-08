type MetricType = 'number' | 'string';

type MetricTypeOf<T extends MetricType> = T extends 'number'
  ? number
  : T extends 'string'
    ? string
    : never;

export class Metric<
  Dimension extends string,
  DimensionTypes extends Record<Dimension, MetricType>,
> {
  readonly #name: string;
  readonly #dimensions: DimensionTypes;

  public constructor(name: string, dimensions: DimensionTypes) {
    this.#dimensions = dimensions;
    this.#name = name;
  }

  public get name(): string {
    return this.#name;
  }

  public get dimensions(): DimensionTypes {
    return this.#dimensions;
  }

  public toJson(dimensions: {
    [K in keyof DimensionTypes]: MetricTypeOf<DimensionTypes[K]>;
  }): Record<'name', string> & {
    [K in keyof DimensionTypes]: MetricTypeOf<DimensionTypes[K]>;
  } {
    return {
      ...dimensions,
      name: this.#name,
    };
  }
}
