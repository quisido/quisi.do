import type { Reducer } from './reducer.js';

export interface Export<State> {
  readonly seed: number;
  readonly state: State;
  readonly timestamp: number;
}

export interface Options<State, Action> {
  readonly initialState: State;
  readonly reducer: Reducer<State, Action>;
  readonly seed: number;
  readonly timestamp: number;
}

export default class QuisidoStore<State, Action> {
  readonly #changeListeners = new Set<(state: State) => void>();
  readonly #reducer: Reducer<State, Action>;
  readonly #seed: number;
  #state: State;
  readonly #timestamp: number;

  public constructor({
    initialState,
    reducer,
    seed,
    timestamp,
  }: Options<State, Action>) {
    this.#reducer = reducer;
    this.#seed = seed;
    this.#state = initialState;
    this.#timestamp = timestamp;
  }

  public dispatch(action: Action): void {
    const newState: State = this.#reducer(this.#state, action);
    this.#state = newState;
    for (const callback of this.#changeListeners) {
      callback(newState);
    }
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
