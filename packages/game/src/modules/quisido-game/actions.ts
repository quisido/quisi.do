export interface Actions {
  readonly axes: readonly number[];
  readonly button: ButtonPayload;
}

export interface ButtonPayload {
  readonly button: 'A' | 'B' | 'X' | 'Y' | 'L' | 'R' | 'Start' | 'Select';
  readonly pressed: boolean;
  readonly touched: boolean;
  readonly value: number;
}
