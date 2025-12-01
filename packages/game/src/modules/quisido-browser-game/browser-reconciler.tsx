import type { ReactNode } from 'react';
import QuisidoReconciler from '../quisido-reconciler/index.js';
import AudioInstance from './audio-instance.js';
import BrowserContainer from './browser-container.js';
import type { BrowserFamily } from './browser-family.js';
import BrowserTextInstance from './browser-text-instance.js';
import DrawImageInstance from './draw-image-instance.js';
import LayerInstance from './layer-instance.js';
import type {
  AudioProps,
  DrawImageProps,
  LayerProps,
  Props,
  TextProps,
} from './props.js';
import TextInstance from './text-instance.js';
import { Type } from './type.js';

const cancelTimeout = (id: number): void => {
  window.clearTimeout(id);
};

const createInstance = <T extends Type>(
  type: T,
  props: Props[T],
): BrowserFamily => {
  switch (type) {
    case Type.Audio:
      return new AudioInstance(props as AudioProps);
    case Type.DrawImage:
      return new DrawImageInstance(props as DrawImageProps);
    case Type.Layer:
      return new LayerInstance(props as LayerProps);
    case Type.Text:
      return new TextInstance(props as TextProps);
  }
};

const createTextInstance = (text: string): BrowserTextInstance =>
  new BrowserTextInstance(text);

const maySuspendCommit = <T extends Type>(
  type: T,
  _props: Props[T],
): boolean => {
  switch (type) {
    case Type.Audio:
    case Type.DrawImage:
      return false;

    case Type.Layer:
    case Type.Text:
      return false;
  }
};

const scheduleMicrotask = (fn: VoidFunction): void => {
  window.queueMicrotask(fn);
};

const scheduleTimeout = (
  fn: (...args: unknown[]) => unknown,
  delay?: number | undefined,
): number => window.setTimeout(fn, delay);

const shouldSetTextContent = (type: Type): boolean => type === Type.Text;

export default class BrowserReconciler extends QuisidoReconciler<
  Type,
  Props,
  BrowserTextInstance,
  BrowserFamily,
  BrowserContainer
> {
  #containers = new WeakMap<HTMLCanvasElement, BrowserContainer>();

  public constructor() {
    super({
      cancelTimeout,
      createInstance,
      createTextInstance,
      maySuspendCommit,
      scheduleMicrotask,
      scheduleTimeout,
      shouldSetTextContent,
    });
  }

  #getContainer(canvas: HTMLCanvasElement): BrowserContainer {
    const container: BrowserContainer | undefined =
      this.#containers.get(canvas);
    if (typeof container !== 'undefined') {
      return container;
    }

    const newContainer = new BrowserContainer(canvas);
    this.#containers.set(canvas, newContainer);
    return newContainer;
  }

  public render(
    element: ReactNode,
    canvas: HTMLCanvasElement,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    this.update(element, this.#getContainer(canvas), onError, callback);
  }
}
