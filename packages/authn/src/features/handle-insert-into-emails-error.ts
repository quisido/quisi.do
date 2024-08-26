import { Snapshot } from '@quisido/proposal-async-context';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getNow,
  logPrivateError,
} from '../constants/worker.js';

export default function handleInsertIntoEmailsError(
  userId: number,
): (err: unknown) => void {
  const snapshot: Snapshot = new Snapshot();
  const startTime: number = getNow();

  return function handleCatch(err: unknown): void {
    const endTime: number = getNow();
    const duration: number = endTime - startTime;
    return snapshot.run((): void => {
      logPrivateError(mapUnknownToError(err));

      emitPrivateMetric({
        duration,
        endTime,
        name: MetricName.EmailInsertError,
        startTime,
        userId,
      });

      emitPublicMetric({
        duration,
        endTime,
        name: MetricName.EmailInsertError,
        startTime,
      });
    });
  };
}
