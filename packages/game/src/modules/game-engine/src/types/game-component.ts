import type GameAction from './game-action.js';
import type { Selector } from './selector.js';

export default interface GameComponent<T, A extends GameAction = never> {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  (this: null, props: GameComponentProps<T, A>): void;
}

export interface GameComponentProps<T, A extends GameAction = never> {
  readonly listen: (action: A, callback: (value: T) => T) => void;
  readonly register: <U>(
    component: GameComponent<U, A>,
    selector: Selector<T, U>,
  ) => void;
  readonly value: T;
}
