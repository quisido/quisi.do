import { type ReactConsumerType, type ReactContext } from 'react-reconciler';

interface Options<T> {
  readonly context: ReactContext<T>;
  readonly typeOf?: symbol | undefined;
}

export default class QuisidoReactConsumerType<
  T,
> implements ReactConsumerType<T> {
  #context: ReactContext<T>;
  #typeof: symbol;

  public constructor({
    context,
    typeOf = Symbol.for('react.consumer'),
  }: Options<T>) {
    this.#context = context;
    this.#typeof = typeOf;
  }

  public get $$typeof(): symbol {
    return this.#typeof;
  }

  public get _context(): ReactContext<T> {
    return this.#context;
  }
}
