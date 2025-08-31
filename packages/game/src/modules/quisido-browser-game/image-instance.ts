import type Instance from '../quisido-game/instance.js';
import type { ImageProps } from '../quisido-game/types.js';
import BrowserElementInstance from './browser-element-instance.js';
import type BrowserNodeInstance from './browser-node-instance.js';

export default class ImageInstance
  extends BrowserElementInstance<'image'>
  implements Instance<BrowserNodeInstance, BrowserElementInstance, 'image'>
{
  public constructor(props: ImageProps) {
    super(
      window.document.createElement('img'),
      (prevProps: ImageProps, nextProps: ImageProps): void => {
        if (prevProps.height !== nextProps.height) {
          this.#setHeight(nextProps.height);
        }

        if (prevProps.src !== nextProps.src) {
          this.#setSrc(nextProps.src);
        }

        if (prevProps.width !== nextProps.width) {
          this.#setWidth(nextProps.width);
        }
      },
    );

    this.#setHeight(props.height);
    this.#setSrc(props.src);
    this.#setWidth(props.width);
  }

  #setHeight(height: number): void {
    this.node.setAttribute('height', height.toString());
  }

  #setSrc(src: string): void {
    this.node.setAttribute('src', src);
  }

  #setWidth(width: number): void {
    this.node.setAttribute('width', width.toString());
  }
}
