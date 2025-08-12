export type Stringifiable =
  | readonly Stringifiable[]
  | StringifiablePrimitive
  | StringifiableRecord;

type StringifiablePrimitive = boolean | null | number | string;

type StringifiableRecord = {
  readonly [K in string]?: Stringifiable;
};
