'use client';

import useDatadog from '../hooks/use-datadog.js';
import useGoogleAnalytics from '../hooks/use-google-analytics.js';
import useMixpanel from '../hooks/use-mixpanel.js';

export default function Analytics(): null {
  useDatadog();
  useGoogleAnalytics();
  useMixpanel('2066f9605c25614b4297e8ae53d8dc23');

  return null;
}
