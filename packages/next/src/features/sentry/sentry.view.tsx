'use client';

import { type Integration } from '@sentry/types';
import { type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import GITHUB_SHA from '../../constants/github-sha.js';
import validateString from '../../utils/validate-string.js';
import useIntegrations from './use-integrations.js';

interface Props {
  readonly children: ReactNode;
}

interface State {
  readonly environment: string;
  readonly integrations: Integration[];
  readonly release: string;
}

const ENVIRONMENT: string = validateString(process.env['SENTRY_ENVIRONMENT']);

function useSentry(): State {
  return {
    environment: ENVIRONMENT,
    integrations: useIntegrations(),
    release: GITHUB_SHA ?? 'unknown',
  };
}

export default function Sentry({ children }: Props): ReactElement {
  const { environment, integrations, release } = useSentry();

  return (
    <SentryReact
      dsn="https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642"
      environment={environment}
      integrations={integrations}
      release={release}
    >
      {children}
    </SentryReact>
  );
}
