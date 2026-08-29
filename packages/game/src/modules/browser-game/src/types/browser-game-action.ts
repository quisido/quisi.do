interface Action<T extends string, P> {
  readonly payload: P;
  readonly type: T;
}

export type BrowserGameAction =
  | Action<'axes', readonly number[]>
  | Action<'button', ButtonPayload>
  | Action<'keydown', KeyboardEvent>
  | Action<'keypress', KeyboardEvent>
  | Action<'keyup', KeyboardEvent>
  | Action<'tap', TapPayload>;

export interface ButtonPayload {
  readonly button: 'A' | 'B' | 'X' | 'Y' | 'L' | 'R' | 'Start' | 'Select';
  readonly pressed: boolean;
  readonly touched: boolean;
  readonly value: number;
}

export interface TapPayload {
  readonly x: number;
  readonly y: number;
}
