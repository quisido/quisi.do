import type { RumInitConfiguration } from '@datadog/browser-rum';
import type { ReactElement, ReactNode } from 'react';
import type User from '../../types/user';
import useDatadog from './datadog.hook';

interface Props extends RumInitConfiguration {
  readonly children: ReactNode;
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function Datadog({
  children,
  enabled,
  sessionReplayRecording,
  user,
  ...rumInitConfiguration
}: Readonly<Props>): ReactElement {
  useDatadog({
    enabled,
    sessionReplayRecording,
    user,
    ...rumInitConfiguration,
  });

  return <>{children}</>;
}
