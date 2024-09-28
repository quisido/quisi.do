import { Snapshot } from '@quisido/proposal-async-context';
import type Worker from '@quisido/worker';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';

export default function handleInsertIntoEmailsError(
  this: Worker,
  userId: number,
): (err: unknown) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = this.getNow();

  const handleCatch = (err: unknown): void => {
    return snapshot.run((): void => {
      const endTime: number = this.getNow();
      const duration: number = endTime - startTime;
      this.logPrivateError(mapUnknownToError(err));

      this.emitPrivateMetric({
        duration,
        endTime,
        name: MetricName.EmailInsertError,
        startTime,
        userId,
      });

      this.emitPublicMetric({
        duration,
        endTime,
        name: MetricName.EmailInsertError,
        startTime,
      });
    });
  };

  return handleCatch;
}
