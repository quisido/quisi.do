import SentryFullStory from '@sentry/fullstory';
import type { Integration } from '@sentry/types';
import { useMemo } from 'react';
import useReactRouterV6SentryBrowserTracingIntegration from 'react-router-v6-instrumentation';

interface State {
  readonly integrations: readonly Integration[];
}

export default function useAppSentry(): State {
  const browserTracing: Integration =
    useReactRouterV6SentryBrowserTracingIntegration();

  return {
    integrations: useMemo(
      (): readonly Integration[] => [
        browserTracing,
        new SentryFullStory('charles-stover'),
      ],
      [browserTracing],
    ),
  };
}
