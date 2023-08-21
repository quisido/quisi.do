'use client';

import type { Context, Provider } from 'react';
import { createContext } from 'react';
import mapContextToProvider from './utils/map-context-to-provider';
import mapContextToHook from './utils/map-context-to-hook';

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
