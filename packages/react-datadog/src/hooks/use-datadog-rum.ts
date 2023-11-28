'use client';

import { datadogRum } from '@datadog/browser-rum';
import { useContext } from 'react';
import DatadogRumContext from '../contexts/datadog-rum.js';

export default function useDatadogRum(): typeof datadogRum {
  const rum: typeof datadogRum | null = useContext(DatadogRumContext);

  if (rum === null) {
    return datadogRum;
  }

  return rum;
}
