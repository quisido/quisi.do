import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type Actions,
  type AudioProps,
  type DrawImageProps,
  type Props,
  type Stringifiable,
  type TextProps,
  Type,
} from '../quisido-game/index.js';
import type { Reducer } from '../quisido-game/reducer.js';
import AudioInstance from './audio-instance.js';
import BrowserContainer from './browser-container.js';
import type { BrowserFamily } from './browser-family.js';
import BrowserTextInstance from './browser-text-instance.js';
import FpsCounter from './fps-counter.js';
import ImageInstance from './image-instance.js';
import TextInstance from './text-instance.js';

interface Options<State extends Stringifiable> {
  readonly Game: FunctionComponent<State>;
  readonly initialState: State;
  readonly reducer: Reducer<State>;
}

export default class BrowserGame<State extends Stringifiable> {
  readonly #animationFrameHandles = new WeakMap<HTMLCanvasElement, number>();
  readonly #fpsCounter = new FpsCounter(5_000);
  readonly #game: QuisidoGame<
    State,
    BrowserTextInstance,
    BrowserFamily,
    BrowserContainer
  >;

  public constructor({ Game, initialState, reducer }: Options<State>) {
    this.#game = new QuisidoGame({
      cancelTimeout(id: number): void {
        window.clearTimeout(id);
      },

      createInstance: <T extends Type>(
        type: T,
        props: Props[T],
      ): BrowserFamily => {
        switch (type) {
          case Type.Audio:
            return new AudioInstance(props as AudioProps);
          case Type.DrawImage:
            return new ImageInstance(props as DrawImageProps);
          case Type.Text:
            return new TextInstance(props as TextProps);
        }
      },

      createTextInstance(text: string): BrowserTextInstance {
        return new BrowserTextInstance(text);
      },

      Game,
      initialState,
      reducer,

      scheduleMicrotask(fn: VoidFunction): void {
        window.queueMicrotask(fn);
      },

      scheduleTimeout(
        fn: (...args: unknown[]) => unknown,
        delay?: number | undefined,
      ): number {
        return window.setTimeout(fn, delay);
      },

      seed: 1,

      shouldSetTextContent(type: Type): boolean {
        return type === Type.Text;
      },

      timestamp: Date.now(),
    });
  }

  #render = (canvas: HTMLCanvasElement, container: BrowserContainer): void => {
    this.#fpsCounter.tick();
    container.render();

    const handle: number = window.requestAnimationFrame((): void => {
      this.#render(canvas, container);
    });
    this.#animationFrameHandles.set(canvas, handle);
  };

  public dispatch<K extends keyof Actions>(type: K, payload: Actions[K]): void {
    this.#game.dispatch(type, payload);
  }

  public start(
    canvas: HTMLCanvasElement,
    onError: (error: Error) => void,
    callback?: VoidFunction | undefined,
  ): VoidFunction {
    const container = new BrowserContainer(canvas);
    this.#game.start(container, onError, (): void => {
      this.#render(canvas, container);
      callback?.();
    });

    return (): void => {
      this.stop(canvas);
    };
  }

  public stop(canvas: HTMLCanvasElement): void {
    const handle: number | undefined = this.#animationFrameHandles.get(canvas);
    if (typeof handle === 'undefined') {
      return;
    }

    window.cancelAnimationFrame(handle);
  }

  public toJSON(): State {
    return this.#game.toJSON();
  }
}
