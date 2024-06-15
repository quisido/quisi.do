'use client';

import { type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import useSentryIntegrations from '../hooks/use-sentry-integrations.js';

interface Props {
  readonly children: ReactNode;
  readonly dsn: string;
  readonly environment: string;
  readonly org: string;
  readonly release: string;
  readonly tracePropagationTargets: string[];
}

export default function Sentry({
  children,
  dsn,
  environment,
  org,
  release,
  tracePropagationTargets,
}: Props): ReactElement {
  const integrations = useSentryIntegrations(org);

  return (
    <SentryReact
      attachStacktrace
      autoSessionTracking
      dsn={dsn}
      enableTracing
      enabled
      environment={environment}
      integrations={integrations}
      normalizeDepth={Number.POSITIVE_INFINITY}
      release={release}
      replaysOnErrorSampleRate={1}
      replaysSessionSampleRate={1}
      sampleRate={1}
      sendClientReports
      sendDefaultPii
      tracePropagationTargets={tracePropagationTargets}
      tracesSampleRate={1}
    >
      {children}
    </SentryReact>
  );
}
