import {
  browserProfilingIntegration,
  replayIntegration,
} from '@sentry/browser';
import type { Integration } from '@sentry/core';
import { useMemo } from 'react';

const REPLAY_INTEGRATION = replayIntegration({
  blockAllMedia: false,
  maskAllText: false,
});

export default function useSentryIntegrations(): Integration[] {
  return useMemo(
    (): Integration[] => [browserProfilingIntegration(), REPLAY_INTEGRATION],
    [],
  );
}
