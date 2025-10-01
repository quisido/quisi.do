import type { Container } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import isRenderableInstance from './is-renderable-instance.js';
import type LayerInstance from './layer-instance.js';
import mapCanvasTo2DRenderingContext from './map-canvas-to-2d-rendering-context.js';
import noop from './noop.js';

export default class BrowserContainer
  implements Container<BrowserTextInstance, BrowserFamily>
{
  readonly #handleError: (error: Error) => void;
  readonly #renderableChildren = new Set<DrawImageInstance | LayerInstance>();
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
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#renderableChildren.add(instance);
    this.#subscribeToRender(instance);
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
    _beforeChild: BrowserFamily | BrowserTextInstance, // | SuspenseInstance,
  ): void {
    this.appendChild(child);
  }

  public removeChild(instance: BrowserFamily | BrowserTextInstance): void {
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#renderableChildren.delete(instance);
    this.#unsubscribeFromRender(instance);
  }

  #render = (): void => {
    this.clear();

    for (const { canvasImageSource, height, width, x, y } of this
      .#renderableChildren) {
      this.#drawImage(canvasImageSource, x, y, width, height);
    }
  };

  #subscribeToRender(instance: DrawImageInstance | LayerInstance): void {
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

    unsubscribe();
  }
}
