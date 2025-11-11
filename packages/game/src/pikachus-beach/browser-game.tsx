import type { FunctionComponent } from 'react';
import type { Actions } from '../actions.js';
import BrowserReconciler from '../modules/quisido-browser-game/browser-reconciler.js';
import QuisidoStore, { type Export } from '../modules/quisido-store/index.js';
import addEventListeners from './add-event-listeners.js';
import Start from './components/start.js';

interface Options<State> {
  readonly canvas: HTMLCanvasElement;
  readonly initialState: State;
  readonly window?: Window | undefined;
}

export default class BrowserGame<State> {
  readonly #canvas: HTMLCanvasElement;
  readonly #Game: FunctionComponent<State>;
  readonly #reconciler = new BrowserReconciler();
  readonly #store: QuisidoStore<State, Actions>;
  #unsubscribe: VoidFunction | undefined;

  public constructor({
    canvas,
    initialState,
    window: windowOption = window,
  }: Options<State>) {
    this.#canvas = canvas;
    this.#Game = Start;

    this.#store = new QuisidoStore({
      initialState,
      reducer: x => x,
      seed: 1,
      timestamp: Date.now(),
    });

    addEventListeners(windowOption, this);

    this.start();
  }

  public dispatch(action: Actions): void {
    this.#store.dispatch(action);
  }

  #render = (state: State): void => {
    const Game: FunctionComponent<State> = this.#Game;

    this.#reconciler.render(
      <Game key="" {...state} />,
      this.#canvas,
      (error: Error): void => {
        window.console.error(error);
      },
    );
  };

  public start(): void {
    this.#unsubscribe = this.#store.onChange(this.#render);
    this.#render(this.#store.state);
  }

  public stop(): void {
    this.#unsubscribe?.();
  }

  public toJSON(): Export<State> {
    return this.#store.toJSON();
  }
}
