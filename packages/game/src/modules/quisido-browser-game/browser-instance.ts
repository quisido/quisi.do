import { mapObjectToEntries } from 'fmrs';
import type { Instance, Props, Type } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';

export default class BrowserInstance<T extends Type = Type>
  implements Instance<Type, Props, BrowserTextInstance, BrowserFamily, T>
{
  #hidden = false;
  #props: Props[T];
  readonly #updates: Partial<Props[T]> = {};

  public constructor(props: Props[T]) {
    this.#props = props;
  }

  // eslint-disable-next-line class-methods-use-this
  public appendChild(_instance: BrowserFamily | BrowserTextInstance): void {
    throw new Error('Browser instances cannot have children.');
  }
  public flush(): Props[T] {
    const newProps: Props[T] = {
      ...this.#props,
      ...this.#updates,
    };
    this.#props = newProps;
    return newProps;
  }

  public get hidden(): boolean {
    return this.#hidden;
  }

  public hide(): void {
    this.#hidden = true;
  }

  // eslint-disable-next-line class-methods-use-this
  public insertBefore(
    _child: BrowserFamily | BrowserTextInstance,
    _beforeChild: BrowserFamily | BrowserTextInstance, // | SuspenseInstance,
  ): void {
    throw new Error('Browser instances cannot insert children.');
  }

  // eslint-disable-next-line class-methods-use-this
  public removeChild(_instance: BrowserFamily | BrowserTextInstance): void {
    throw new Error('Browser instances cannot remove children.');
  }

  // eslint-disable-next-line class-methods-use-this
  public resetTextContent(): void {
    // Do nothing.
  }

  public unhide(): void {
    this.#hidden = false;
  }

  public update(_prevProps: Props[T], nextProps: Props[T]): void {
    for (const [key, value] of mapObjectToEntries(nextProps)) {
      if (this.#props[key] === value) {
        continue;
      }

      this.#updates[key] = value;
    }
  }
}
