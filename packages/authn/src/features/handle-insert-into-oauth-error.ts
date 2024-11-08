import { Snapshot } from '@quisido/proposal-async-context';
import type Worker from '@quisido/worker';
import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';

export default function handleInsertIntoOAuthError(
  this: Worker,
  userId: number,
): (err: unknown) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = this.now();

  const handleCatch = (err: unknown): void => {
    snapshot.run((): void => {
      const endTime: number = this.now();
      this.logPrivateError(mapToError(err));

      this.emitPrivateMetric({
        duration: endTime - startTime,
        endTime,
        name: MetricName.OAuthInsertError,
        startTime,
        userId,
      });

      this.emitPublicMetric({
        duration: endTime - startTime,
        endTime,
        name: MetricName.OAuthInsertError,
        startTime,
      });
    });
  };

  return handleCatch;
}
