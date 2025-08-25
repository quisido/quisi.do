import type { ReactContext, ReactProviderType } from 'react-reconciler';
import QuisidoReactProviderType from './react-provider-type.js';

interface Options<T> {
  readonly threadCount: number;
  readonly typeOf: symbol;
  readonly value: T;
}

export default class QuisidoReactContext<T> implements ReactContext<T> {
  #currentValue: T;
  #currentValue2: T;
  #Provider: ReactProviderType<T>;
  #threadCount: number;
  #typeof: symbol | number;

  public constructor({ threadCount, typeOf, value }: Options<T>) {
    this.#currentValue = value;
    this.#currentValue2 = value;
    this.#typeof = typeOf;
    this.#threadCount = threadCount;
    this.#Provider = new QuisidoReactProviderType({
      context: this,
      typeOf,
    });
  }

  public get $$typeof(): symbol | number {
    return this.#typeof;
  }

  public get _currentValue(): T {
    return this.#currentValue;
  }

  public get _currentValue2(): T {
    return this.#currentValue2;
  }

  public get _threadCount(): number {
    return this.#threadCount;
  }

  public get Consumer(): this {
    return this;
  }

  public get Provider(): ReactProviderType<T> {
    return this.#Provider;
  }
}
