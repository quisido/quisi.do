import type { Container } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type DrawImageInstance from './draw-image-instance.js';
import isRenderableInstance from './is-renderable-instance.js';
import type LayerInstance from './layer-instance.js';

export default class BrowserContainer
  implements Container<BrowserTextInstance, BrowserFamily>
{
  readonly #children = new Set<DrawImageInstance | LayerInstance>();
  readonly #renderingContext: CanvasRenderingContext2D;
  readonly #unsubscriptions = new WeakMap<
    DrawImageInstance | LayerInstance,
    VoidFunction
  >();

  public constructor(canvas: HTMLCanvasElement) {
    const renderingContext: CanvasRenderingContext2D | null = canvas.getContext(
      '2d',
      {
        alpha: true,
        colorSpace: 'display-p3',
        desynchronized: true,
        willReadFrequently: false,
      },
    );

    if (renderingContext === null) {
      throw new Error('Canvas does not have a 2D rendering context.');
    }

    this.#renderingContext = renderingContext;
  }

  public appendChild(instance: BrowserFamily | BrowserTextInstance): void {
    if (!isRenderableInstance(instance)) {
      return;
    }

    const unsubscribe = instance.onRender(this.#render);

    this.#children.add(instance);
    this.#unsubscriptions.set(instance, unsubscribe);
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

    this.#children.delete(instance);
    this.#unsubscriptions.get(instance)?.();
  }

  #render = (): void => {
    for (const { canvasImageSource, height, width, x, y } of this.#children) {
      this.#renderingContext.drawImage(canvasImageSource, x, y, width, height);
    }
  };
}
