'use client';

import type { RumInitConfiguration, datadogRum } from '@datadog/browser-rum';
import { useEffect, useRef, type RefObject } from 'react';
import useShallowMemo from 'use-shallow-memo';
import type User from '../types/user.js';
import useDatadogRum from './use-datadog-rum.js';
import useUser from './use-user.js';

export interface Props extends RumInitConfiguration {
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function useDatadog({
  enabled = true,
  sessionReplayRecording = true,
  silentMultipleInit = true,
  site = 'datadoghq.com',
  user,
  ...rumInitConfiguration
}: Props): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // States
  const lastInitConfiguration: RefObject<RumInitConfiguration | null> =
    useRef(null);

  const rumInitConfigurationMemo: RumInitConfiguration = useShallowMemo({
    ...rumInitConfiguration,
    silentMultipleInit,
    site,
  });

  // Effects
  useEffect((): void => {
    if (!enabled) {
      return;
    }

    lastInitConfiguration.current = rumInitConfigurationMemo;
    rum.init(rumInitConfigurationMemo);
  }, [enabled, rum, rumInitConfigurationMemo]);

  useEffect((): VoidFunction | undefined => {
    if (!enabled || !sessionReplayRecording) {
      return;
    }

    rum.startSessionReplayRecording();
    return (): void => {
      rum.stopSessionReplayRecording();
    };
  }, [enabled, rum, sessionReplayRecording]);

  useUser(user);
}
