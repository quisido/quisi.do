import createContextUtils from '../modules/create-context-utils/index.js';

export const {
  ContextProvider: SessionIdProvider,
  useContextValue: useSessionId,
} = createContextUtils<string | undefined>();
