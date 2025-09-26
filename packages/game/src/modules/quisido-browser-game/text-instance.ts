import type { Instance } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type { TextProps } from './props.js';

/**
 *   `TextInstance` is for stylized text, such as speech bubbles.
 *   For plain text, see `BrowserTextInstance`.
 */

const throwError = (): never => {
  throw new Error('Method not defined');
};

export default class TextInstance
  implements Instance<TextProps, BrowserTextInstance, BrowserFamily>
{
  public readonly appendChild = throwError;
  public readonly hide = throwError;
  public readonly insertBefore = throwError;
  #props: TextProps;
  public readonly removeChild = throwError;
  public readonly resetTextContent = throwError;
  public readonly unhide = throwError;

  public constructor(props: TextProps) {
    this.#props = props;
  }

  public update(_prevProps: TextProps, nextProps: TextProps): void {
    this.#props = nextProps;
  }
}
