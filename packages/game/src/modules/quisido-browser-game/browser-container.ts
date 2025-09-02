import type { Container, Props, Type } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';

export default class BrowserContainer
  implements Container<Type, Props, BrowserTextInstance, BrowserFamily>
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
    this.#children.add(instance);
  }

  public clear(): void {
    this.#renderingContext.clearRect(
      0,
      0,
      this.#renderingContext.canvas.width,
      this.#renderingContext.canvas.height,
    );
  }

  public insertBefore(
    child: BrowserFamily | BrowserTextInstance,
    _beforeChild: BrowserFamily | BrowserTextInstance, // | SuspenseInstance,
  ): void {
    this.#children.add(child);
  }

  public removeChild(instance: BrowserFamily | BrowserTextInstance): void {
    this.#children.delete(instance);
  }
}
