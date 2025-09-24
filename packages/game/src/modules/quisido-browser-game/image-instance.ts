import BrowserInstance from './browser-instance.js';
import type { DrawImageProps } from './props.js';
import type { Type } from './type.js';

export default class ImageInstance extends BrowserInstance<Type.DrawImage> {
  readonly #image: HTMLImageElement;

  public constructor(props: DrawImageProps) {
    super();
    this.#image = window.document.createElement('img');
    this.#image.setAttribute('src', props.src);
    this.#props = props;
  }

  public get canvasImageSource(): CanvasImageSource {
    return this.#image;
  }

  // Delay the commit via `maySuspendCommit` until the image has loaded.
  // Use a transparent pixel or `new ImageBitmap()` as a placeholder.
  public override update(
    prevProps: DrawImageProps,
    nextProps: DrawImageProps,
  ): void {
    super.update(prevProps, nextProps);
    this.#image.setAttribute('src', nextProps.src);
  }
}
