import type { Instance } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import type { Props } from './props.js';
import type { Type } from './type.js';

export default class BrowserInstance<T extends Type = Type>
  implements Instance<Props[T], BrowserTextInstance, BrowserFamily>
{
  readonly #childSubscriptions = new WeakMap<BrowserFamily, () => void>();
  #hidden = false;

  public appendChild(instance: BrowserFamily | BrowserTextInstance): void {
    if (!(instance instanceof BrowserInstance)) {
      return;
    }

    const handleUpdate = <T extends Type>(
      descendent: BrowserInstance<T>,
      props: Props[T],
    ): void => {
      this.#callUpdateCallbacks(descendent, props);
    };

    const unsubscribe = instance.onUpdate(handleUpdate);
    this.#childSubscriptions.set(instance, unsubscribe);
  }

  #callUpdateCallbacks<T extends Type>(
    descendent: BrowserInstance<T>,
    props: Props[T],
  ): void {
    for (const callback of this.#updateCallbacks) {
      callback(descendent, props);
    }
  }

  public get hidden(): boolean {
    return this.#hidden;
  }

  public hide(): void {
    this.#hidden = true;
  }

  public insertBefore(
    child: BrowserFamily | BrowserTextInstance,
    _beforeChild: BrowserFamily | BrowserTextInstance, // | SuspenseInstance,
  ): void {
    this.appendChild(child);
  }

  public onUpdate(
    callback: <T extends Type>(
      instance: BrowserInstance<T>,
      props: Props[T],
    ) => void,
  ): () => void {
    this.#updateCallbacks.add(callback);
    return (): void => {
      this.#updateCallbacks.delete(callback);
    };
  }

  public removeChild(instance: BrowserFamily | BrowserTextInstance): void {
    if (!(instance instanceof BrowserInstance)) {
      return;
    }

    const unsubscribe = this.#childSubscriptions.get(instance);
    unsubscribe?.();
  }

  // eslint-disable-next-line class-methods-use-this
  public resetTextContent(): void {
    // Do nothing.
  }

  public unhide(): void {
    this.#hidden = false;
  }

  public update(_prevProps: Props[T], nextProps: Props[T]): void {
    for (const callback of this.#updateCallbacks) {
      callback(this, nextProps);
    }
  }

  readonly #updateCallbacks = new Set<
    <T extends Type>(instance: BrowserInstance<T>, props: Props[T]) => void
  >();
}
