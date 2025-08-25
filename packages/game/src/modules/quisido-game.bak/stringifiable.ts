export type Stringifiable =
  | readonly Stringifiable[]
  | StringifiablePrimitive
  | StringifiableRecord;

type StringifiablePrimitive = boolean | null | number | string;

export type StringifiableRecord = {
  readonly [K in string]?: Stringifiable | undefined;
};
