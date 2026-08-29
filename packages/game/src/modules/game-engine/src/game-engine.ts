import type { GameEngineAction } from '../types/game-engine-action.js';
import type { Game } from '../types/game.js';

export interface GameEngineOptions<
  GameState,
  GameAction extends GameEngineAction,
> {
  readonly game: Game<GameState, GameAction>;
  readonly lastTick?: number | undefined;
  readonly now?: (() => number) | undefined;
  readonly random?: (() => number) | undefined;
  readonly state: GameState;
}

const VERSION = 1;

export default class GameEngine<
  GameState,
  GameAction extends GameEngineAction,
> {
  public static get VERSION(): number {
    return VERSION;
  }

  readonly #game: Game<GameState, GameAction>;
  #lastTick: number;
  readonly #now: () => number;
  #state: GameState;

  public constructor({
    game,
    lastTick,
    now = Date.now.bind(Date),
    state,
  }: GameEngineOptions<GameState, GameAction>) {
    this.#game = game;
    this.#lastTick = lastTick ?? now();
    this.#now = now;
    this.#state = state;
  }

  public dispatch(action: GameAction): void {
    // Roll the state time forward before acting on it.
    this.tick();

    const state: GameState = this.#game.reduce(this.#state, action);
    this.#setState(state);
  }

  #setState(state: GameState): void {
    // TODO: Identify differences; push them to a render queue.
    this.#state = state;
  }

  public tick(): void {
    const now: number = this.#now();
    const dt: number = now - this.#lastTick;
    const state: GameState = this.#game.tick(this.#state, dt);
    this.#lastTick = now;
    this.#setState(state);
  }

  // eslint-disable-next-line class-methods-use-this
  public version(): number {
    return GameEngine.VERSION;
  }
}
