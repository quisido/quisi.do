import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  logPrivateError,
} from '../constants/worker.js';

export default function handleInsertIntoEmailsError(
  userId: number,
): (err: unknown) => void {
  const startTime: number = Date.now();

  return function handleCatch(err: unknown): void {
    const endTime: number = Date.now();
    logPrivateError(mapUnknownToError(err));

    emitPrivateMetric({
      duration: endTime - startTime,
      endTime,
      name: MetricName.EmailInsertError,
      startTime,
      userId,
    });

    emitPublicMetric({
      duration: endTime - startTime,
      endTime,
      name: MetricName.EmailInsertError,
      startTime,
    });
  };
}
