import type { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import useDatadogRum from './use-datadog-rum.js';

interface Props {
  readonly enabled: boolean;
  readonly sessionReplayRecording: boolean;
}

export default function useSessionReplayRecording({
  enabled,
  sessionReplayRecording,
}: Props): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (!enabled || !sessionReplayRecording) {
      return;
    }

    rum.startSessionReplayRecording();
    return (): void => {
      rum.stopSessionReplayRecording();
    };
  }, [enabled, rum, sessionReplayRecording]);
}
