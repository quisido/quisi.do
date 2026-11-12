import { type Container } from '../quisido-reconciler/index.js';
import { type BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import insertChild from './insert-child.js';
import isRenderableInstance from './is-renderable-instance.js';
import type LayerInstance from './layer-instance.js';
import mapCanvasTo2DRenderingContext from './map-canvas-to-2d-rendering-context.js';
import noop from './noop.js';

export default class BrowserContainer implements Container<
  BrowserTextInstance,
  BrowserFamily
> {
  // Non-rendering siblings can still be insertion anchors.
  readonly #children: (BrowserFamily | BrowserTextInstance)[] = [];
  readonly #handleError: (error: Error) => void;
  readonly #renderingContext: CanvasRenderingContext2D;
  readonly #renderUnsubscriptions = new WeakMap<
    DrawImageInstance | LayerInstance,
    VoidFunction
  >();

  public constructor(
    canvas: HTMLCanvasElement,
    onError?: ((error: Error) => void) | undefined,
  ) {
    this.#handleError = onError ?? noop;
    this.#renderingContext = mapCanvasTo2DRenderingContext(canvas);
  }

  public appendChild(instance: BrowserFamily | BrowserTextInstance): void {
    insertChild(this.#children, instance);
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#subscribeToRender(instance);
    this.#render();
  }

  public clear(): void {
    // this.#renderingContext.save();
    // this.#renderingContext.resetTransform();
    this.#renderingContext.clearRect(
      0,
      0,
      this.#renderingContext.canvas.width,
      this.#renderingContext.canvas.height,
    );
    // this.#renderingContext.restore();
  }

  #drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    this.#renderingContext.drawImage(image, x, y, width, height);
  }

  public insertBefore(
    child: BrowserFamily | BrowserTextInstance,
    beforeChild: BrowserFamily | BrowserTextInstance,
  ): void {
    insertChild(this.#children, child, beforeChild);
    if (!isRenderableInstance(child)) {
      return;
    }

    this.#subscribeToRender(child);
    this.#render();
  }

  public removeChild(instance: BrowserFamily | BrowserTextInstance): void {
    const index = this.#children.indexOf(instance);
    if (index !== -1) {
      this.#children.splice(index, 1);
    }

    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#unsubscribeFromRender(instance);
    this.#render();
  }

  #render = (): void => {
    this.clear();

    for (const child of this.#children) {
      if (!isRenderableInstance(child)) {
        continue;
      }

      const { canvasImageSource, height, width, x, y } = child;
      this.#drawImage(canvasImageSource, x, y, width, height);
    }
  };

  #subscribeToRender(instance: DrawImageInstance | LayerInstance): void {
    if (this.#renderUnsubscriptions.has(instance)) {
      return;
    }

    const unsubscribe = instance.onRender(this.#render);
    this.#renderUnsubscriptions.set(instance, unsubscribe);
  }

  #unsubscribeFromRender(instance: DrawImageInstance | LayerInstance): void {
    const unsubscribe: VoidFunction | undefined =
      this.#renderUnsubscriptions.get(instance);

    // This should never happen, so we emit an error for monitoring.
    if (typeof unsubscribe === 'undefined') {
      this.#handleError(
        new Error('Container is not subscribed to instance', {
          cause: instance,
        }),
      );
      return;
    }

    this.#renderUnsubscriptions.delete(instance);
    unsubscribe();
  }
}
