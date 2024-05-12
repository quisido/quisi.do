'use client';

import { type Integration } from '@sentry/types';
import { type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import { GITHUB_SHA } from '../../constants/github-sha.js';
import validateString from '../../utils/validate-string.js';
import useIntegrations from './use-integrations.js';

interface Props {
  readonly children: ReactNode;
}

interface State {
  readonly integrations: Integration[];
  readonly release: string;
}

const ENVIRONMENT: string = validateString(process.env['SENTRY_ENVIRONMENT']);
const TRACE_PROPAGATION_TARGETS: string[] = [
  'api.quisi.do',
  'localhost',
  'quisi.do',
];

function useSentry(): State {
  return {
    integrations: useIntegrations(),
    release: GITHUB_SHA ?? 'unknown',
  };
}

export default function Sentry({ children }: Props): ReactElement {
  const { integrations, release } = useSentry();

  return (
    <SentryReact
      attachStacktrace
      autoSessionTracking
      dsn="https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642"
      enableTracing
      enabled
      environment={ENVIRONMENT}
      integrations={integrations}
      normalizeDepth={Number.POSITIVE_INFINITY}
      release={release}
      replaysOnErrorSampleRate={1}
      replaysSessionSampleRate={1}
      sampleRate={1}
      sendClientReports
      sendDefaultPii
      tracePropagationTargets={TRACE_PROPAGATION_TARGETS}
      tracesSampleRate={1}
    >
      {children}
    </SentryReact>
  );
}
