import SentryFullStory from '@sentry/fullstory';
import { ReactRouterInstrumentation } from '@sentry/react/dist/types';
import { Integrations } from '@sentry/tracing';
import type { Integration } from '@sentry/types';
import { useMemo } from 'react';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';

interface State {
  readonly integrations: readonly Integration[];
}

export default function useAppSentry(): State {
  const routingInstrumentation: ReactRouterInstrumentation =
    useRoutingInstrumentation();

  return {
    integrations: useMemo(
      (): readonly Integration[] => [
        new Integrations.BrowserTracing({
          routingInstrumentation,
        }),
        new SentryFullStory('charles-stover'),
      ],
      [routingInstrumentation],
    ),
  };
}
