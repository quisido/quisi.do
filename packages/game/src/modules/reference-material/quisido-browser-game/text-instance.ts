import type { Instance } from '../quisido-reconciler/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type { TextProps } from './props.js';

/**
 * `TextInstance` is for stylized text, such as speech bubbles.
 * For plain text, see `BrowserTextInstance`.
 */

const throwError = (): never => {
  throw new Error('Method not defined');
};

export default class TextInstance implements Instance<
  TextProps,
  BrowserTextInstance,
  BrowserFamily
> {
  public readonly appendChild: () => never = throwError;
  public readonly hide: () => never = throwError;
  public readonly insertBefore: () => never = throwError;
  // #props: TextProps;
  public readonly removeChild: () => never = throwError;
  public readonly resetTextContent: () => never = throwError;
  public readonly unhide: () => never = throwError;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  public constructor(_props: TextProps) {
    // this.#props = props;
  }

  // eslint-disable-next-line class-methods-use-this
  public update(_prevProps: TextProps, _nextProps: TextProps): void {
    // this.#props = nextProps;
  }
}
