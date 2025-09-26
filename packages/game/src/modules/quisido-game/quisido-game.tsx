import type { Actions } from './actions.js';
import type { Reducer } from './reducer.js';
import type { Stringifiable, StringifiableRecord } from './stringifiable.js';

export interface Export<State extends Stringifiable> {
  readonly seed: number;
  readonly state: State;
  readonly timestamp: number;
}

export interface QuisidoGameOptions<State extends Stringifiable> {
  readonly initialState: State;
  readonly reducer: Reducer<State>;
  readonly seed: number;
  readonly timestamp: number;
}

export default class QuisidoGame<State extends StringifiableRecord> {
  readonly #changeListeners = new Set<(state: State) => void>();
  readonly #reducer: Reducer<State>;
  readonly #seed: number;
  readonly #state: State;
  readonly #timestamp: number;

  public constructor({
    initialState,
    reducer,
    seed,
    timestamp,
  }: QuisidoGameOptions<State>) {
    this.#reducer = reducer;
    this.#seed = seed;
    this.#state = initialState;
    this.#timestamp = timestamp;
  }

  public dispatch<K extends keyof Actions>(
    action: K,
    payload: Actions[K],
  ): void {
    this.#reducer(this.#state, action, payload);
  }

  public onChange(listener: (state: State) => void): () => void {
    this.#changeListeners.add(listener);

    return (): void => {
      this.#changeListeners.delete(listener);
    };
  }

  public get state(): State {
    return this.#state;
  }

  public toJSON(): Export<State> {
    return {
      seed: this.#seed,
      state: this.#state,
      timestamp: this.#timestamp,
    };
  }
}
