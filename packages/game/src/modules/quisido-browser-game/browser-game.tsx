import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type Actions,
  type Stringifiable,
  type StringifiableRecord,
} from '../quisido-game/index.js';
import type { Export } from '../quisido-game/quisido-game.js';
import type { Reducer } from '../quisido-game/reducer.js';
import type BrowserContainer from './browser-container.js';
import BrowserReconciler from './browser-reconciler.js';
import FpsCounter from './fps-counter.js';

interface Options<State extends Stringifiable> {
  readonly canvas: HTMLCanvasElement;
  readonly Game: FunctionComponent<State>;
  readonly initialState: State;
  readonly reducer: Reducer<State>;
}

export default class BrowserGame<State extends StringifiableRecord> {
  readonly #animationFrameHandles = new WeakMap<HTMLCanvasElement, number>();
  readonly #canvas: HTMLCanvasElement;
  readonly #fpsCounter = new FpsCounter(5_000);
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

  #render = (canvas: HTMLCanvasElement, container: BrowserContainer): void => {
    this.#fpsCounter.tick();

    const handle: number = window.requestAnimationFrame((): void => {
      this.#render(canvas, container);
    });
    this.#animationFrameHandles.set(canvas, handle);
  };

  public dispatch<K extends keyof Actions>(type: K, payload: Actions[K]): void {
    this.#game.dispatch(type, payload);
  }

  public start(): void {
    this.#unsubscribe = this.#game.onChange((state: State): void => {
      const Game: FunctionComponent<State> = this.#Game;

      this.#reconciler.render(
        <Game {...state} />,
        this.#canvas,
        (error: Error): void => {
          window.console.error(error);
        },
      );
    });
  }

  public stop(): void {
    this.#unsubscribe?.();
  }

  public toJSON(): Export<State> {
    return this.#game.toJSON();
  }
}
