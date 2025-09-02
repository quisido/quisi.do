import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type AudioProps,
  type ImageProps,
  type Props,
  type State,
  type TextProps,
  Type,
} from '../quisido-game/index.js';
import type { FamilyMember } from '../quisido-reconciler/index.js';
import AudioInstance from './audio-instance.js';
import BrowserContainer from './browser-container.js';
import type { BrowserFamily } from './browser-family.js';
import BrowserTextInstance from './browser-text-instance.js';
import ImageInstance from './image-instance.js';

export default class BrowserGame {
  #animationFrameHandles = new WeakMap<HTMLCanvasElement, number>();
  #game: QuisidoGame<BrowserTextInstance, BrowserFamily, BrowserContainer>;

  public constructor(Game: FunctionComponent) {
    this.#game = new QuisidoGame({
      cancelTimeout(id: number): void {
        window.clearTimeout(id);
      },

      createInstance: <T extends Type>(
        type: T,
        props: Props[T],
      ): FamilyMember<Type, Props, BrowserTextInstance, BrowserFamily, T> => {
        switch (type) {
          case Type.Audio:
            return new AudioInstance(props as AudioProps);
          case Type.Image:
            return new ImageInstance(props as ImageProps);
          case Type.Text:
            return new BrowserTextInstance((props as TextProps).children);
        }
      },

      createTextInstance(text: string): BrowserTextInstance {
        return new BrowserTextInstance(text);
      },

      Game,

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
    container.render();

    const handle: number = window.requestAnimationFrame((): void => {
      this.#render(canvas, container);
    });
    this.#animationFrameHandles.set(canvas, handle);
  };

  public dispatch(type: string, payload: unknown): void {
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
