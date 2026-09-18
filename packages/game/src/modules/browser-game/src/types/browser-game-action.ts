import type { GameAction } from "../../../game/src/index.js";

export type BrowserGameAction =
  | GameAction<'axes', readonly number[]>
  | GameAction<'button', ButtonPayload>
  | GameAction<'keydown', KeyboardEvent>
  | GameAction<'keypress', KeyboardEvent>
  | GameAction<'keyup', KeyboardEvent>
  | GameAction<'tap', TapPayload>;

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
