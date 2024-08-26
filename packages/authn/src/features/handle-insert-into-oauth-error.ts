import { Snapshot } from '@quisido/proposal-async-context';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getNow,
  logPrivateError,
} from '../constants/worker.js';

export default function handleInsertIntoOAuthError(
  userId: number,
): (err: unknown) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = getNow();

  return function handleCatch(err: unknown): void {
    return snapshot.run((): void => {
      const endTime: number = getNow();
      logPrivateError(mapUnknownToError(err));

      emitPrivateMetric({
        duration: endTime - startTime,
        endTime,
        name: MetricName.OAuthInsertError,
        startTime,
        userId,
      });

      emitPublicMetric({
        duration: endTime - startTime,
        endTime,
        name: MetricName.OAuthInsertError,
        startTime,
      });
    });
  };
}
