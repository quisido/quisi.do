export type Stringifiable =
  | boolean
  | null
  | number
  | string
  | StringifiableArray
  | StringifiableRecord;

export type StringifiableArray = readonly Stringifiable[];

export type StringifiableRecord = {
  readonly [K in string]?: Stringifiable | undefined;
};
