import {
  browserProfilingIntegration,
  replayIntegration,
} from '@sentry/browser';
import type { Integration } from '@sentry/core';
import { useMemo } from 'react';

/**
 * Types of property 'afterAllSetup' are incompatible.
 *   Types of parameters 'client' and 'client' are incompatible.
 *     Property '_options' is protected but type 'Client<O>' is not a class
 *     derived from 'Client<O>'. ts(2352)
 */
const REPLAY_INTEGRATION: Integration = replayIntegration({
  blockAllMedia: false,
  maskAllText: false,
}) as unknown as Integration;

export default function useSentryIntegrations(): Integration[] {
  return useMemo(
    (): Integration[] => [browserProfilingIntegration(), REPLAY_INTEGRATION],
    [],
  );
}
