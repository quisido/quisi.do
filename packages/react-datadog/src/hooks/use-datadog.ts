'use client';

import type { RumInitConfiguration, datadogRum } from '@datadog/browser-rum';
import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';
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
  site = 'datadoghq.com',
  user,
  ...rumInitConfiguration
}: Props): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // States
  const lastInitConfiguration: MutableRefObject<RumInitConfiguration | null> =
    useRef(null);
  const rumInitConfigurationMemo: RumInitConfiguration = useShallowMemo({
    site,
    ...rumInitConfiguration,
  });

  // Effects
  useEffect((): void => {
    if (!enabled) {
      return;
    }

    /**
     * In strict mode, React will execute this effect hook twice, which emits a
     *   console error: "DD_RUM is already initialized."
     * If the initialization configuration has not changed, do not initialize
     *   again.
     */
    if (lastInitConfiguration.current === rumInitConfigurationMemo) {
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
