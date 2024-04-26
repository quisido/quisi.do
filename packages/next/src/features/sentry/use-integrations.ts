import { metrics } from '@sentry/browser';
import type { Integration } from '@sentry/types';
import { useFullstory, type FSApi } from 'fullstory-react';
import { useMemo } from 'react';
import BROWSER_TRACING_INTEGRATION from '../../constants/browser-tracing-integration.js';
import mapFullStoryApiToIntegration from './utils/map-fullstory-api-to-integration.js';

export default function useIntegrations(): Integration[] {
  const fullstory: FSApi = useFullstory();
  return useMemo((): Integration[] =>
    [
      BROWSER_TRACING_INTEGRATION,
      mapFullStoryApiToIntegration(fullstory),
      metrics.metricsAggregatorIntegration(),
    ],
    [fullstory],
  );
}
