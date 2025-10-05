import type { User } from '@sentry/core';
import { memo, type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import useSentryIntegrations from '../hooks/use-sentry-integrations.js';

interface Props {
  readonly children: ReactNode;
  readonly dsn: string;
  readonly environment: string;
  readonly release: string;
  readonly tracePropagationTargets: string[];
  readonly user?: User | undefined;
}

const IGNORE_ERRORS: RegExp[] = [
  /^Object Not Found Matching Id:\d+, MethodName:\w+, ParamCount:\d+$/u,
];

function Sentry({
  children,
  dsn,
  environment,
  release,
  tracePropagationTargets,
  user,
}: Props): ReactElement {
  const integrations = useSentryIntegrations();

  return (
    <SentryReact
      attachStacktrace
      dsn={dsn}
      enabled
      environment={environment}
      ignoreErrors={IGNORE_ERRORS}
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
