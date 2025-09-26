import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type Actions,
  type Stringifiable,
  type StringifiableRecord,
} from '../quisido-game/index.js';
import type { Export } from '../quisido-game/quisido-game.js';
import type { Reducer } from '../quisido-game/reducer.js';
import BrowserReconciler from './browser-reconciler.js';

interface Options<State extends Stringifiable> {
  readonly canvas: HTMLCanvasElement;
  readonly Game: FunctionComponent<State>;
  readonly initialState: State;
  readonly reducer: Reducer<State>;
}

export default class BrowserGame<State extends StringifiableRecord> {
  readonly #canvas: HTMLCanvasElement;
  readonly #Game: FunctionComponent<State>;
  readonly #game: QuisidoGame<State>;
  readonly #reconciler = new BrowserReconciler();
  #unsubscribe: VoidFunction | undefined;

  public constructor({ canvas, Game, initialState, reducer }: Options<State>) {
    this.#canvas = canvas;
    this.#Game = Game;
    this.#game = new QuisidoGame({
      initialState,
      reducer,
      seed: 1,
      timestamp: Date.now(),
    });

    this.start();
  }

  public dispatch<K extends keyof Actions>(type: K, payload: Actions[K]): void {
    this.#game.dispatch(type, payload);
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
