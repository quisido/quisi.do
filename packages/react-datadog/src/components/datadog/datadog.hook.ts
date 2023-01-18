import type { RumInitConfiguration, datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import DEFAULT_REPLAY_SAMPLE_RATE from '../../constants/default-replay-sample-rate';
import DEFAULT_SAMPLE_RATE from '../../constants/default-sample-rate';
import useDatadogRum from '../../hooks/use-datadog-rum';
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

  // Effects
  useEffect((): void => {
    if (!enabled) {
      return;
    }

    rum.init({
      replaySampleRate,
      sampleRate,
      site,
      trackInteractions,
      ...rumInitConfiguration,
    });
  }, [
    enabled,
    replaySampleRate,
    rum,
    rumInitConfiguration,
    sampleRate,
    site,
    trackInteractions,
  ]);

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
