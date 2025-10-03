import type { Reducer } from './reducer.js';
import type { Stringifiable, StringifiableRecord } from './stringifiable.js';

export interface Export<State extends Stringifiable> {
  readonly seed: number;
  readonly state: State;
  readonly timestamp: number;
}

export interface Options<State extends Stringifiable, Action> {
  readonly initialState: State;
  readonly reducer: Reducer<State, Action>;
  readonly seed: number;
  readonly timestamp: number;
}

export default class QuisidoStore<State extends StringifiableRecord, Action> {
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
