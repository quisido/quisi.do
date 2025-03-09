'use client';

import type { User } from '@sentry/core';
import { memo, useMemo, type ReactElement, type ReactNode } from 'react';
import Sentry from '../components/sentry.jsx';
import { GITHUB_SHA } from '../constants/github-sha.js';
import {
  useAuthentication,
  type AuthenticationState,
} from '../contexts/authentication.js';
import validateString from '../utils/validate-string.js';

interface Props {
  readonly children: ReactNode;
}

interface State {
  readonly user: User | undefined;
}

const ENVIRONMENT: string = validateString(process.env['SENTRY_ENVIRONMENT']);
const RELEASE: string = GITHUB_SHA ?? 'unknown';
const TRACE_PROPAGATION_TARGETS: string[] = [
  'api.quisi.do',
  'localhost',
  'quisi.do',
];

function useSentry(): State {
  // Contexts
  const authn: AuthenticationState = useAuthentication();

  // States
  const user = useMemo((): User | undefined => {
    if (typeof authn.data === 'undefined') {
      return;
    }

    const { id } = authn.data;
    if (id === null) {
      return;
    }

    return {
      ...authn.data,
      id,
    };
  }, [authn]);

  return {
    user,
  };
}

function SentryFeature({ children }: Props): ReactElement {
  const { user } = useSentry();

  return (
    <Sentry
      dsn="https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642"
      environment={ENVIRONMENT}
      org="quisido"
      release={RELEASE}
      tracePropagationTargets={TRACE_PROPAGATION_TARGETS}
      user={user}
    >
      {children}
    </Sentry>
  );
}

export default memo(SentryFeature);
