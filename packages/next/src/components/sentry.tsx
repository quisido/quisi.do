'use client';

import type { User } from '@sentry/core';
import { memo, type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import useSentryIntegrations from '../hooks/use-sentry-integrations.js';

interface Props {
  readonly children: ReactNode;
  readonly dsn: string;
  readonly environment: string;
  readonly org: string;
  readonly release: string;
  readonly tracePropagationTargets: string[];
  readonly user?: User | undefined;
}

function Sentry({
  children,
  dsn,
  environment,
  org,
  release,
  tracePropagationTargets,
  user,
}: Props): ReactElement {
  const integrations = useSentryIntegrations(org);

  return (
    <SentryReact
      attachStacktrace
      dsn={dsn}
      enabled
      environment={environment}
      integrations={integrations}
      normalizeDepth={Number.POSITIVE_INFINITY}
      profilesSampleRate={1}
      release={release}
      replaysOnErrorSampleRate={1}
      replaysSessionSampleRate={1}
      sampleRate={1}
      sendClientReports
      sendDefaultPii
      tracePropagationTargets={tracePropagationTargets}
      tracesSampleRate={1}
      user={user}
    >
      {children}
    </SentryReact>
  );
}

export default memo(Sentry);
