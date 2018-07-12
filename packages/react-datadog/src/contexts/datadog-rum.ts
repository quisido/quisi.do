'use client';

import type { datadogRum } from '@datadog/browser-rum';
import type { Context } from 'react';
import { createContext } from 'react';

const DatadogRumContext: Context<typeof datadogRum | null> = createContext<
  typeof datadogRum | null
>(null);

export default DatadogRumContext;
