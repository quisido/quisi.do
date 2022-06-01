import type { ReactElement, ReactNode } from 'react';
import Sentry from 'sentry-react';
import GITHUB_SHA from '../../../../constants/github-sha';
import SENTRY_INTEGRATIONS from '../../constants/sentry-integrations';

interface Props {
  readonly children: ReactNode;
}

export default function AppSentry({ children }: Readonly<Props>): ReactElement {
  return (
    <Sentry
      dsn="https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642"
      environment={process.env.NODE_ENV}
      integrations={SENTRY_INTEGRATIONS}
      release={GITHUB_SHA ?? 'unknown'}
    >
      {children}
    </Sentry>
  );
}
