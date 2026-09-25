import type GameAction from './game-action.js';
import type { Selector } from './selector.js';

export type GameComponent<T, A extends GameAction = never> = (
  // ESLint is wrong here; `this: void` is a valid first argument.
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  this: void,
  props: GameComponentProps<T, A>,
) => void;

export interface GameComponentProps<T, Action extends GameAction = never> {
  readonly listen: <A extends Action>(action: A['type'], callback: (value: T, action: A) => T) => void;
  readonly onTick: (dt: number, value: T) => T;
  readonly register: <U>(
    component: GameComponent<U, Action>,
    selector: Selector<T, U>,
  ) => void;
  readonly tag: (tag: string) => void;
  readonly value: T;
}
