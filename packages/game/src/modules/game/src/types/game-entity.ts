import type GameAction from './game-action.js';
import { type GameComponent } from './game-component.js';

export default interface GameEntity<T, A extends GameAction = never> {
  readonly component: GameComponent<T, A>;
  readonly id: number;
  readonly subentities: Set<GameEntity<unknown, A>>;
  value: T;
}
