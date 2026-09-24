import type GameAction from './types/game-action.js';
import { type GameComponent } from './types/game-component.js';
import type GameEntity from './types/game-entity.js';
import { type Selector } from './types/selector.js';
import ActionListeners from './utils/action-listeners.js';

export interface GameOptions<GameState, Action extends GameAction> {
  readonly initialState: GameState;
  readonly lastTick?: number | undefined;

  /**
   * the maximum delay (in milliseconds) before an action is dropped entirely,
   * a.k.a. de-synchronization limit, rollback buffer window, command history
   * timeout
   * @see https://en.wikipedia.org/wiki/Netcode
   */
  readonly maxLag?: number | undefined;
  readonly now?: (() => number) | undefined;
  readonly random?: (() => number) | undefined;
  readonly world: GameComponent<GameState, Action>;
}

export default class Game<GameState, Action extends GameAction> {
  readonly #entities: GameEntity<unknown, Action>[] = [];
  #lastTick: number;
  #listeners = new ActionListeners<Action>();
  #nextEntityId: number = 1;
  readonly #now: () => number;
  readonly #random: () => number;
  readonly #world: GameEntity<GameState, Action>;

  public constructor({
    initialState,
    lastTick,
    maxLag = 500,
    now = Date.now.bind(Date),
    random = Math.random.bind(Math),
    world,
  }: GameOptions<GameState, Action>) {
    this.#lastTick = lastTick ?? now();
    this.#now = now;
    this.#random = random;
    this.#world = {
      component: world,
      id: 0,
      subentities: new Set(),
      value: initialState,
    };

    world({
      listen: <A extends Action>(type: A['type'], callback: (value: GameState, action: A) => GameState): void => {
        this.listen(type, (action: A): void => {
          this.#world.value = callback(this.#world.value, action);
        });
      },
      onTick: (_dt: number, value: GameState): GameState => {
        return value;
      },
      register: <U>(
        component: GameComponent<U, Action>,
        selector: Selector<GameState, U>,
      ): void => {
        const entity: GameEntity<U, Action> = {
          component,
          id: this.#createEntityId(),
          subentities: new Set(),
          value: selector(this.#world.value),
        };
        this.#entities.push(entity);
      },
      tag: (_tag: string): void => {
        // Do nothing.
      },
      value: initialState,
    });
  }

  #createEntityId(): number {
    this.#nextEntityId += 1;
    return this.#nextEntityId;
  }

  public dispatch(action: Action): readonly Action[] {
    // Roll the state time forward before acting on it.
    this.tick();

    const { type }  = action;
    for (const listener of this.#listeners.get(type)) {
      listener(action);
    }

    return [];
  }

  public listen<A extends Action>(type: A['type'], callback: (action: A) => void): void {
    this.#listeners.add(type, callback);
  }

  public get state(): GameState {
    return this.#world.value;
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
}
