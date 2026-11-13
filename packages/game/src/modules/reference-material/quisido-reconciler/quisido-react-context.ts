import { type Context, createContext } from 'react';
import { type ReactContext } from 'react-reconciler';

interface QuisidoReactContextOptions<T> {
  readonly threadCount?: number | undefined;
  readonly typeOf?: symbol | number | undefined;
  readonly value: T;
}

type QuisidoReactContextInstance<T> = Context<T> & ReactContext<T>;

type QuisidoReactContextConstructor = new <T>(
  options: QuisidoReactContextOptions<T>,
) => QuisidoReactContextInstance<T>;

const QuisidoReactContext: QuisidoReactContextConstructor =
  function createQuisidoReactContext<T>({
    threadCount = 0,
    value,
  }: QuisidoReactContextOptions<T>): QuisidoReactContextInstance<T> {
    const context = createContext(value) as QuisidoReactContextInstance<T>;
    Object.assign(context, { _threadCount: threadCount });
    return context;
  } as unknown as QuisidoReactContextConstructor;

export type {
  QuisidoReactContextConstructor,
  QuisidoReactContextInstance,
  QuisidoReactContextOptions,
};

export default QuisidoReactContext;
