import type { GameEngineAction } from './game-engine-action.js';

export interface Game<GameState, GameAction extends GameEngineAction> {
  // Update the state in response to actions, e.g. user input.
  readonly reduce: (state: GameState, action: GameAction) => GameState;

  // Time-driven updates (e.g., physics, movement, timers)
  // Update time-based state deterministically, e.g. physics.
  // Mutate the state directly to avoid garbage collection.
  readonly tick: (state: GameState, dt: number) => GameState;
}
