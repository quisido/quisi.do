import type { ReactContext, ReactProviderType } from 'react-reconciler';

interface Options<T> {
  readonly context: ReactContext<T>;
  readonly typeOf: symbol | number;
}

export default class QuisidoReactProviderType<T>
  implements ReactProviderType<T>
{
  #context: ReactContext<T>;
  #typeof: symbol | number;

  public constructor({ context, typeOf }: Options<T>) {
    this.#context = context;
    this.#typeof = typeOf;
  }

  public get $$typeof(): symbol | number {
    return this.#typeof;
  }

  public get _context(): ReactContext<T> {
    return this.#context;
  }
}
