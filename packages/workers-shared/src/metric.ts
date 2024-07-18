export type Metric<
  Name extends string = string,
  NumericDimensions extends string = never,
  StringDimensions extends string = never,
> = Record<'name', Name> &
  Record<NumericDimensions, number> &
  Record<StringDimensions, string>;
