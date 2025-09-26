import type { Instance } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import { EMPTY_OFFSCREEN_CANVAS } from './empty-offscreen-canvas.js';
import isRenderableInstance from './is-renderable-instance.js';
import type { LayerProps } from './props.js';

const HEIGHT_DIMENSION_INDEX = 1;
const WIDTH_DIMENSION_INDEX = 0;
const X_COORDINATE_INDEX = 0;
const Y_COORDINATE_INDEX = 1;

const GET_CONTEXT_OPTIONS = {
  alpha: true,
  colorSpace: 'display-p3',
  desynchronized: true,
  willReadFrequently: false,
};

export default class LayerInstance
  implements Instance<LayerProps, BrowserTextInstance, BrowserFamily>
{
  readonly #canvas: OffscreenCanvas;
  readonly #children = new Set<DrawImageInstance | LayerInstance>();
  #coordinates: readonly [number, number];
  #dimensions: readonly [number, number];
  #hidden = false;
  readonly #renderCallbacks = new Set<VoidFunction>();
  readonly #renderingContext: OffscreenCanvasRenderingContext2D | null;
  readonly #unsubscriptions = new WeakMap<
    DrawImageInstance | LayerInstance,
    VoidFunction
  >();

  public constructor({ height, width, x, y }: LayerProps) {
    const canvas = new OffscreenCanvas(width, height);
    this.#canvas = canvas;
    this.#coordinates = [x, y];
    this.#dimensions = [width, height];
    this.#renderingContext = canvas.getContext('2d', GET_CONTEXT_OPTIONS);
  }

  public appendChild(instance: BrowserFamily | BrowserTextInstance) {
    if (!isRenderableInstance(instance)) {
      return;
    }

    this.#children.add(instance);
    const unsubscribe = instance.onRender(this.#render);
    this.#unsubscriptions.set(instance, unsubscribe);
  }

  public get canvasImageSource(): CanvasImageSource {
    if (this.#hidden) {
      return EMPTY_OFFSCREEN_CANVAS;
    }

    return this.#canvas;
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

    this.#children.delete(instance);
    this.#unsubscriptions.get(instance)?.();
  }

  #render = (): void => {
    const [width, height] = this.#dimensions;
    this.#canvas.height = height;
    this.#canvas.width = width;

    if (this.#renderingContext !== null) {
      for (const { canvasImageSource, height, width, x, y } of this.#children) {
        this.#renderingContext.drawImage(
          canvasImageSource,
          x,
          y,
          width,
          height,
        );
      }
    }

    for (const callback of this.#renderCallbacks) {
      callback();
    }
  };

  public unhide(): void {
    this.#hidden = false;
  }

  public update(
    _prevProps: LayerProps,
    { height, width, x, y }: LayerProps,
  ): void {
    this.#coordinates = [x, y];
    this.#dimensions = [width, height];
    /**
     *   We don't need to regenerate the OffscreenCanvas here, but there is no
     * need to optimize prematurely.
     */
    this.#render();
  }

  public get width(): number {
    return this.#dimensions[WIDTH_DIMENSION_INDEX];
  }

  // eslint-disable-next-line id-length
  public get x(): number {
    return this.#coordinates[X_COORDINATE_INDEX];
  }

  // eslint-disable-next-line id-length
  public get y(): number {
    return this.#coordinates[Y_COORDINATE_INDEX];
  }
}
