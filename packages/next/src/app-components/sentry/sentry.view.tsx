'use client';

import { type ReactElement, type ReactNode } from 'react';
import SentryReact from 'sentry-react';
import useSentry from './sentry.hook';

interface Props {
  readonly children: ReactNode;
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
