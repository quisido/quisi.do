import type GameAction from './game-action.js';
import type GameComponent from './game-component.js';

export default interface GameEntity<T, A extends GameAction = never> {
  readonly component: GameComponent<T, A>;
  readonly id: symbol;
  readonly value: T;
}
