import type { datadogRum } from '@datadog/browser-rum';
import { createContext, type Context } from 'react';

const DatadogRumContext: Context<typeof datadogRum | null> = createContext<
  typeof datadogRum | null
>(null);

export default DatadogRumContext;
