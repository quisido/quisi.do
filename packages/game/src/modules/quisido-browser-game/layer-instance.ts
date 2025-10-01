import type { Instance } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import { EMPTY_OFFSCREEN_CANVAS } from './empty-offscreen-canvas.js';
import isRenderableInstance from './is-renderable-instance.js';
import mapOffscreenCanvasTo2DRenderingContext from './map-offscreen-canvas-to-2d-rendering-context.js';
import noop from './noop.js';
import type { LayerProps } from './props.js';
import Tuple from './tuple.js';

const HEIGHT_DIMENSION_INDEX = 1;
const WIDTH_DIMENSION_INDEX = 0;
const X_COORDINATE_INDEX = 0;
const Y_COORDINATE_INDEX = 1;

export default class LayerInstance
  implements Instance<LayerProps, BrowserTextInstance, BrowserFamily>
{
  readonly #coordinates: Tuple<number>;
  readonly #dimensions: Tuple<number>;
  readonly #handleError: (error: Error) => void;
  #hidden = false;
  readonly #offscreenCanvas: OffscreenCanvas;
  readonly #renderCallbacks = new Set<VoidFunction>();
  readonly #renderableChildren = new Set<DrawImageInstance | LayerInstance>();
  readonly #renderingContext: OffscreenCanvasRenderingContext2D;
  readonly #renderUnsubscriptions = new WeakMap<
    DrawImageInstance | LayerInstance,
    VoidFunction
  >();

  public constructor(
    { height, width, x, y }: LayerProps,
    onError?: ((error: Error) => void) | undefined,
  ) {
    const offscreenCanvas = new OffscreenCanvas(width, height);

    this.#coordinates = new Tuple(x, y);
    this.#dimensions = new Tuple(width, height);
    this.#handleError = onError ?? noop;
    this.#offscreenCanvas = offscreenCanvas;
    this.#renderingContext =
      mapOffscreenCanvasTo2DRenderingContext(offscreenCanvas);
  }

  public appendChild(instance: BrowserFamily | BrowserTextInstance) {
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#renderableChildren.add(instance);
    this.#subscribeToRender(instance);
  }

  public get canvasImageSource(): CanvasImageSource {
    if (this.#hidden) {
      return EMPTY_OFFSCREEN_CANVAS;
    }

    return this.#offscreenCanvas;
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

  public get height(): number {
    return this.#dimensions[HEIGHT_DIMENSION_INDEX];
  }

  public hide(): void {
    this.#hidden = true;
  }

  public insertBefore(instance: BrowserFamily | BrowserTextInstance): void {
    this.appendChild(instance);
  }

  public onRender(callback: VoidFunction): VoidFunction {
    this.#renderCallbacks.add(callback);

    return (): void => {
      this.#renderCallbacks.delete(callback);
    };
  }

  public removeChild(instance: BrowserFamily | BrowserTextInstance): void {
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#renderableChildren.delete(instance);
    this.#unsubscribeFromRender(instance);
  }

  #renderOffscreen = (): void => {
    this.clear();

    const [width, height] = this.#dimensions;
    this.#offscreenCanvas.height = height;
    this.#offscreenCanvas.width = width;

    for (const { canvasImageSource, height, width, x, y } of this
      .#renderableChildren) {
      this.#drawImage(canvasImageSource, x, y, width, height);
    }

    for (const callback of this.#renderCallbacks) {
      callback();
    }
  };

  #subscribeToRender(instance: DrawImageInstance | LayerInstance): void {
    const unsubscribe = instance.onRender(this.#renderOffscreen);
    this.#renderUnsubscriptions.set(instance, unsubscribe);
  }

  public unhide(): void {
    this.#hidden = false;
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

  public update(
    _prevProps: LayerProps,
    { height, width, x, y }: LayerProps,
  ): void {
    this.#coordinates.set(x, y);
    this.#dimensions.set(width, height);
    this.#renderOffscreen();
  }

  public get width(): number {
    return this.#dimensions[WIDTH_DIMENSION_INDEX];
  }

  public get x(): number {
    return this.#coordinates[X_COORDINATE_INDEX];
  }

  public get y(): number {
    return this.#coordinates[Y_COORDINATE_INDEX];
  }
}
