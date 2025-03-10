import createContextUtils from '../utils/create-context-utils';

export const {
  ContextProvider: SessionIdProvider,
  useContextValue: useSessionId,
} = createContextUtils<string | undefined>();
