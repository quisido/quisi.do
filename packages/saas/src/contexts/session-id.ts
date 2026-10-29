import { type Provider } from 'react';
import createContextUtils from '../modules/create-context-utils/index.js';

const { ContextProvider, useContextValue } = createContextUtils<
  string | undefined
>();

export const SessionIdProvider: Provider<string | undefined> = ContextProvider;
export const useSessionId: () => string | undefined = useContextValue;
