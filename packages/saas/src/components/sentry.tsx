import { type DataCollection, type User } from '@sentry/core';
import { type ReactElement, type ReactNode } from 'react';
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

const DATA_COLLECTION: DataCollection = {
  cookies: true,
  frameContextLines: 7,
  genAI: {
    inputs: true,
    outputs: true,
  },
  httpBodies: [
    'incomingRequest',
    'outgoingRequest',
    'incomingResponse',
    'outgoingResponse',
  ],
  httpHeaders: {
    request: true,
    response: true,
  },
  queryParams: true,
  stackFrameVariables: true,
  userInfo: true,
};

const IGNORE_ERRORS: RegExp[] = [
  /^Object Not Found Matching Id:\d+, MethodName:\w+, ParamCount:\d+$/u,
];

export default function Sentry({
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
      release={release}
      replaysOnErrorSampleRate={1}
      replaysSessionSampleRate={1}
      sampleRate={1}
      sendClientReports
      dataCollection={DATA_COLLECTION}
      tracePropagationTargets={tracePropagationTargets}
      tracesSampleRate={1}
      user={user}
    >
      {children}
    </SentryReact>
  );
}
