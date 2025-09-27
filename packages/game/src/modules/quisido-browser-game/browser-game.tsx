import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type Stringifiable,
  type StringifiableRecord,
} from '../quisido-game/index.js';
import type { Export } from '../quisido-game/quisido-game.js';
import type { Reducer } from '../quisido-game/reducer.js';
import BrowserReconciler from './browser-reconciler.js';

interface Options<State extends Stringifiable, Actions> {
  readonly canvas: HTMLCanvasElement;
  readonly Game: FunctionComponent<State>;
  readonly initialState: State;
  readonly reducer: Reducer<State, Actions>;
}

export default class BrowserGame<State extends StringifiableRecord, Action> {
  readonly #canvas: HTMLCanvasElement;
  readonly #Game: FunctionComponent<State>;
  readonly #game: QuisidoGame<State, Action>;
  readonly #reconciler = new BrowserReconciler();
  #unsubscribe: VoidFunction | undefined;

  public constructor({
    canvas,
    Game,
    initialState,
    reducer,
  }: Options<State, Action>) {
    this.#canvas = canvas;
    this.#Game = Game;

    // Replace this class with a QuisidoStore from Redux.
    this.#game = new QuisidoGame({
      initialState,
      reducer,
      seed: 1,
      timestamp: Date.now(),
    });

    this.start();
  }

  public dispatch(action: Action): void {
    this.#game.dispatch(action);
  }

  #render = (state: State): void => {
    const Game: FunctionComponent<State> = this.#Game;

    this.#reconciler.render(
      <Game {...state} />,
      this.#canvas,
      (error: Error): void => {
        window.console.error(error);
      },
    );
  };

  public start(): void {
    this.#unsubscribe = this.#game.onChange(this.#render);
    this.#render(this.#game.state);
  }

  public stop(): void {
    this.#unsubscribe?.();
  }

  public toJSON(): Export<State> {
    return this.#game.toJSON();
  }
}
