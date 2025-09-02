import { type ImageProps, type Type } from '../quisido-game/index.js';
import BrowserInstance from './browser-instance.js';

export default class ImageInstance extends BrowserInstance<Type.Image> {
  #image: HTMLImageElement;
  public constructor(props: ImageProps) {
    super(props);
    this.#image = window.document.createElement('img');
    this.#image.setAttribute('src', props.src);
  }

  public get canvasImageSource(): CanvasImageSource {
    return this.#image;
  }
}
