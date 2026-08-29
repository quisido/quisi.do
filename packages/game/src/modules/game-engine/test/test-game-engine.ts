import { GameEngine } from '../src/index.js';
import identity from '../src/utils/identity.js';
import type { GameEngineAction } from '../types/game-engine-action.js';
import { TEST_NOW } from './test-now.js';

interface TestGameEngineOptions<
  GameState,
  GameAction extends GameEngineAction,
> {
  readonly gameReducer?:
    ((state: GameState, action: GameAction) => GameState) | undefined;
  readonly gameState: GameState;
  readonly lastTick?: number;
}

export default class TestGameEngine<
  GameState = undefined,
  GameAction extends GameEngineAction = GameEngineAction,
> extends GameEngine<GameState, GameAction> {
  public constructor({
    gameReducer,
    gameState,
    lastTick = 0,
  }: TestGameEngineOptions<GameState, GameAction>) {
    super({
      game: {
        reduce: gameReducer ?? identity,
        tick: identity,
      },
      lastTick,
      now: TEST_NOW,
      state: gameState,
    });
  }
}
