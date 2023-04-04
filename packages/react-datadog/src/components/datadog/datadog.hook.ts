import type { RumInitConfiguration, datadogRum } from '@datadog/browser-rum';
import { MutableRefObject, useEffect, useRef } from 'react';
import DEFAULT_REPLAY_SAMPLE_RATE from '../../constants/default-replay-sample-rate';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import useDatadogRum from '../../hooks/use-datadog-rum';
import useShallowMemo from '../../hooks/use-shallow-memo';
import type User from '../../types/user';
import useUser from './hooks/use-user';

interface Props extends RumInitConfiguration {
  readonly enabled?: boolean | undefined;
  readonly sessionReplayRecording?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function useDatadog({
  enabled = true,
  replaySampleRate = DEFAULT_REPLAY_SAMPLE_RATE,
  sampleRate = DEFAULT_SAMPLE_RATE,
  sessionReplayRecording = true,
  site = 'datadoghq.com',
  trackInteractions = true,
  user,
  ...rumInitConfiguration
}: Readonly<Props>): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // States
  const lastInitConfiguration: MutableRefObject<RumInitConfiguration | null> =
    useRef(null);
  const rumInitConfigurationMemo: RumInitConfiguration = useShallowMemo({
    replaySampleRate,
    sampleRate,
    site,
    trackInteractions,
    ...rumInitConfiguration,
  });

  // Effects
  useEffect((): void => {
    if (!enabled) {
      return;
    }

    // In strict mode, React will execute this effect hook twice, which emits a
    //   console error: "DD_RUM is already initialized."
    // If the initialization configuration has not changed, do not initialize
    //   again.
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
