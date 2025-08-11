export type Stringifiable =
  | readonly Stringifiable[]
  | StringifiablePrimitive
  | StringifiableRecord;

type StringifiablePrimitive = boolean | null | number | string;

interface StringifiableRecord {
  readonly [key: string]: Stringifiable;
}
