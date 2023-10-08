'use client';

import type { RumInitConfiguration } from '@datadog/browser-rum';
import type User from '../../types/user.js';
import useDatadog from './datadog.hook.js';

interface Props extends RumInitConfiguration {
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function Datadog({
  enabled,
  sessionReplayRecording,
  user,
  ...rumInitConfiguration
}: Props): null {
  useDatadog({
    enabled,
    sessionReplayRecording,
    user,
    ...rumInitConfiguration,
  });

  return null;
}
