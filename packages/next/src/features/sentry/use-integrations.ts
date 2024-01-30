import type { Integration } from '@sentry/types';
import { type FSApi, useFullStory } from 'fullstory-react';
import { useMemo } from 'react';
import BROWSER_TRACING_INTEGRATION from '../../constants/browser-tracing-integration.js';
import mapFullStoryApiToIntegration from './utils/map-fullstory-api-to-integration.js';

export default function useIntegrations(): Integration[] {
  /**
   *   Even though we aren't getting the FullStory API from context, this hook
   * allows us to mock it with context in unit tests.
   */
  const FS: FSApi = useFullStory({
    orgId: '150TVM',
  });

  return useMemo((): Integration[] => {
    const fullStoryIntegration: Integration = mapFullStoryApiToIntegration(FS);
    return [BROWSER_TRACING_INTEGRATION, fullStoryIntegration];
  }, [FS]);
}
