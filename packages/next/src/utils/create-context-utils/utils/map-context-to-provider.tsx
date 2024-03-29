'use client';

import {
  type Context,
  type Provider,
  type ProviderProps,
  type ReactElement,
} from 'react';

export default function mapContextToProvider<T>(
  Context: Context<T | null>,
): Provider<T> {
  function ContextProvider({
    children,
    value,
  }: Readonly<ProviderProps<T>>): ReactElement {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return Object.assign(ContextProvider, {
    $$typeof: Context.Provider.$$typeof,
  });
}
