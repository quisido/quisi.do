import type { Container } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import BrowserInstance from './browser-instance.js';
import type BrowserTextInstance from './browser-text-instance.js';
import ImageInstance from './image-instance.js';
import type { Props } from './props.js';
import type { Type } from './type.js';

export default class BrowserContainer
  implements Container<BrowserTextInstance, BrowserFamily>
{
  readonly #children = new Set<BrowserFamily | BrowserTextInstance>();
  readonly #renderingContext: CanvasRenderingContext2D;

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
    if (!(instance instanceof BrowserInstance)) {
      return;
    }

    instance.onUpdate(
      <T extends Type>(child: BrowserInstance<T>, props: Props[T]): void => {
        if (child instanceof ImageInstance) {
          this.#renderingContext.drawImage(
            child.canvasImageSource,
            props.x,
            props.y,
            props.width,
            props.height,
          );
        }
      },
    );
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
    this.#children.delete(instance);
  }
}
