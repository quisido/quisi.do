import type GameAction from './types/game-action.js';
import type GameEntity from './types/game-entity.js';

export interface GameEngineOptions<GameState, A extends GameAction> {
  readonly lastTick?: number | undefined;
  readonly now?: (() => number) | undefined;
  readonly random?: (() => number) | undefined;
  readonly state: GameState;
  readonly world: GameEntity<GameState, A>;
}

const VERSION = 1;

export default class GameEngine<GameState, A extends GameAction> {
  public static get VERSION(): number {
    return VERSION;
  }

  readonly #entities: readonly GameEntity<unknown>[] = [];
  #lastTick: number;
  readonly #now: () => number;
  #state: GameState;
  readonly #world: GameEntity<GameState, A>;

  public constructor({
    lastTick,
    now = Date.now.bind(Date),
    state,
    world,
  }: GameEngineOptions<GameState, A>) {
    this.#lastTick = lastTick ?? now();
    this.#now = now;
    this.#state = state;
    this.#world = world;
  }

  public dispatch(action: A): void {
    // Roll the state time forward before acting on it.
    this.tick();
    // Loop over each entity that registered an `action.type` listener, then
    // entity.value = reduce(entity.value, action);
    // this.#state = this.#world(this.#state, action);
  }

  public getEntities<T>(
    // @ts-expect-error  'T' could be instantiated with an arbitrary type which could be unrelated to 'unknown'.ts(2677)
    selector: (entity: GameEntity<unknown>) => entity is GameEntity<T>,
  ): readonly GameEntity<T>[] {
    return this.#entities.filter(selector) as readonly GameEntity<T>[];
  }

  public tick(): void {
    // Instead of the main game handling tick behavior,
    // Loop over each entity that has registered a deterministic, Time-based
    // System, then tick those systems.
    const now: number = this.#now();
    const dt: number = now - this.#lastTick;
    // this.#state = this.#world.tick(this.#state, dt);
    this.#lastTick = now;
  }

  // eslint-disable-next-line class-methods-use-this
  public version(): number {
    return GameEngine.VERSION;
  }
}
