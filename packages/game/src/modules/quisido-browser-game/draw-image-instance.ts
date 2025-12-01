import type { Instance } from '../quisido-reconciler/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import { EMPTY_OFFSCREEN_CANVAS } from './empty-offscreen-canvas.js';
import { getImage } from './image-preloader.js';
import type { DrawImageProps } from './props.js';

const HEIGHT_DIMENSION_INDEX = 1;
const WIDTH_DIMENSION_INDEX = 0;
const X_COORDINATE_INDEX = 0;
const Y_COORDINATE_INDEX = 1;

const resizeCanvasImageSource = (
  canvasImageSource: CanvasImageSource,
  {
    height: resizeHeight,
    quality: resizeQuality = 'high',
    source,
    width: resizeWidth,
  }: Omit<DrawImageProps, 'src' | 'x' | 'y'>,
): Promise<CanvasImageSource> => {
  const options: ImageBitmapOptions = {
    resizeHeight,
    resizeQuality,
    resizeWidth,
  };

  if (source === undefined) {
    return window.createImageBitmap(canvasImageSource, options);
  }

  const { height, width, x, y } = source;
  return window.createImageBitmap(
    canvasImageSource,
    x,
    y,
    width,
    height,
    options,
  );
};

const throwChildMethodError = (): never => {
  throw new Error('Images cannot have children.');
};

const mapPropsToCanvasImageSource = ({
  height,
  quality,
  source,
  src,
  width,
}: Omit<DrawImageProps, 'x' | 'y'>): Promise<CanvasImageSource> => {
  const canvasImageSource: CanvasImageSource | Promise<CanvasImageSource> =
    getImage(src);

  if (!(canvasImageSource instanceof Promise)) {
    return resizeCanvasImageSource(canvasImageSource, {
      height,
      quality,
      source,
      width,
    });
  }

  return canvasImageSource.then(
    (loadedCanvasImageSource: CanvasImageSource): Promise<CanvasImageSource> =>
      resizeCanvasImageSource(loadedCanvasImageSource, {
        height,
        quality,
        source,
        width,
      }),
  );
};

export default class DrawImageInstance
  implements Instance<DrawImageProps, BrowserTextInstance, BrowserFamily>
{
  public readonly appendChild = throwChildMethodError;
  #canvasImageSource: CanvasImageSource | Promise<CanvasImageSource>;
  #coordinates: readonly [number, number];
  #dimensions: readonly [number, number];
  #hidden = false;
  public readonly insertBefore = throwChildMethodError;
  public readonly removeChild = throwChildMethodError;
  readonly #renderCallbacks = new Set<VoidFunction>();

  public constructor({
    height,
    quality,
    source,
    src,
    width,
    x,
    y,
  }: DrawImageProps) {
    this.#canvasImageSource = this.#mapPropsToCanvasImageSource({
      height,
      quality,
      source,
      src,
      width,
    });
    this.#coordinates = [x, y];
    this.#dimensions = [width, height];
  }

  public get canvasImageSource(): CanvasImageSource {
    if (this.#hidden || this.#canvasImageSource instanceof Promise) {
      return EMPTY_OFFSCREEN_CANVAS;
    }

    return this.#canvasImageSource;
  }

  public get coordinates(): readonly [number, number] {
    return this.#coordinates;
  }

  public get dimensions(): readonly [number, number] {
    return this.#dimensions;
  }

  #handleCanvasImageSourceError = (): void => {
    this.#canvasImageSource = EMPTY_OFFSCREEN_CANVAS;
  };

  public get height(): number {
    return this.#dimensions[HEIGHT_DIMENSION_INDEX];
  }

  public hide(): void {
    this.#hidden = true;
    this.#render();
  }

  #mapPropsToCanvasImageSource(
    props: Omit<DrawImageProps, 'x' | 'y'>,
  ): Promise<CanvasImageSource> {
    const canvasImageSource: Promise<CanvasImageSource> =
      mapPropsToCanvasImageSource(props);
    void canvasImageSource
      .then(this.#setCanvasImageSource)
      .catch(this.#handleCanvasImageSourceError)
      .finally(this.#render);
    return canvasImageSource;
  }

  public onRender(callback: VoidFunction): VoidFunction {
    this.#renderCallbacks.add(callback);

    return (): void => {
      this.#renderCallbacks.delete(callback);
    };
  }

  #render = (): void => {
    for (const callback of this.#renderCallbacks) {
      callback();
    }
  };

  #setCanvasImageSource = (canvasImageSource: CanvasImageSource): void => {
    this.#canvasImageSource = canvasImageSource;
  };

  public unhide(): void {
    this.#hidden = false;
    this.#render();
  }

  // Delay the commit via `maySuspendCommit` until the image has loaded.
  public update(
    _prevProps: DrawImageProps,
    { height, quality, source, src, width, x, y }: DrawImageProps,
  ): void {
    this.#canvasImageSource = this.#mapPropsToCanvasImageSource({
      height,
      quality,
      source,
      src,
      width,
    });
    this.#coordinates = [x, y];
    this.#dimensions = [width, height];

    /**
     *   Render immediately to remove the previous the current image, even if
     * the new image has not loaded yet.
     */
    this.#render();
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
