import type { FunctionComponent } from 'react';
import QuisidoGame, {
  type ImageProps,
  type MusicProps,
  type Props,
  type Type,
} from '../quisido-game/index.js';
import BrowserContainer from './browser-container.js';
import type BrowserElementInstance from './browser-element-instance.js';
import BrowserNodeInstance from './browser-node-instance.js';
import ImageInstance from './image-instance.js';
import MusicInstance from './music-instance.js';

export default class BrowserGame {
  #game: QuisidoGame<
    BrowserNodeInstance,
    BrowserElementInstance,
    BrowserContainer
  >;

  public constructor(Game: FunctionComponent) {
    this.#game = new QuisidoGame({
      cancelTimeout(id: number): void {
        window.clearTimeout(id);
      },

      createInstance: <T extends Type>(
        type: T,
        props: Props[T],
      ): BrowserElementInstance<T> => {
        switch (type) {
          case 'image':
            // @ts-expect-error TypeScript cannot infer that `T` is 'image'.
            return new ImageInstance(props as ImageProps);
          case 'music':
            // @ts-expect-error TypeScript cannot infer that `T` is 'music'.
            return new MusicInstance(props as MusicProps);
        }
      },

      createTextInstance(text: string): BrowserNodeInstance {
        const node: Text = window.document.createTextNode(text);
        return new BrowserNodeInstance(node);
      },

      Game,

      scheduleTimeout(
        fn: (...args: unknown[]) => unknown,
        delay?: number | undefined,
      ): number {
        return window.setTimeout(fn, delay);
      },

      seed: 1,
      timestamp: Date.now(),
    });
  }

  public start(
    canvas: HTMLCanvasElement,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    const container = new BrowserContainer(canvas);
    this.#game.start(container, onError, callback);
  }
}
