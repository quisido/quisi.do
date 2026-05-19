import { type Context, createContext, type Provider } from 'react';
import mapContextToHook from './utils/map-context-to-hook.js';
import mapContextToProvider from './utils/map-context-to-provider.js';

interface ContextUtils<T> {
  readonly ContextProvider: Provider<T>;
  readonly useContextValue: () => T;
}

export default function createContextUtils<T>(): ContextUtils<T> {
  const Context: Context<T | null> = createContext<T | null>(null);

  return {
    ContextProvider: mapContextToProvider(Context),
    useContextValue: mapContextToHook(Context),
  };
}
