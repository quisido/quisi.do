'use client';

import createContextUtils from '../utils/create-context-utils';

export const {
  ContextProvider: HostnameProvider,
  useContextValue: useHostname,
} = createContextUtils<string>();
