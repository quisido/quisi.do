export interface GenericDatum {
  readonly numbers: readonly number[];
  readonly strings: readonly string[];
  readonly timestamp: number;
}

export type Datum = GenericDatum | number;
