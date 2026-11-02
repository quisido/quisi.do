import { type ReactContext } from 'react-reconciler';

import QuisidoReactConsumerType from './quisido-react-consumer-type.js';

interface Options<T> {
  readonly threadCount: number;
  readonly typeOf: symbol;
  readonly value: T;
}

export default class QuisidoReactContext<T> implements ReactContext<T> {
  #consumer: QuisidoReactConsumerType<T>;
  #currentValue: T;
  #currentValue2: T;
  #threadCount: number;
  #typeof: symbol | number;

  public constructor({ threadCount, typeOf, value }: Options<T>) {
    this.#consumer = new QuisidoReactConsumerType({
      context: this,
      typeOf,
    });
    this.#currentValue = value;
    this.#currentValue2 = value;
    this.#threadCount = threadCount;
    this.#typeof = typeOf;
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

  public get Consumer(): QuisidoReactConsumerType<T> {
    return this.#consumer;
  }

  // Since React 19, the Context is its own Provider.
  public get Provider(): this {
    return this;
  }
}
