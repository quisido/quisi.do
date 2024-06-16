import { fullStoryIntegration } from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import { useFullstory, type FSApi } from 'fullstory-react';
import { useMemo } from 'react';

export default function useSentryIntegrations(
  sentryOrg: string,
): Integration[] {
  const fullstory: FSApi = useFullstory();

  return useMemo(
    (): Integration[] => [
      fullStoryIntegration(sentryOrg, {
        client: fullstory,
      }),
    ],
    [fullstory],
  );
}
