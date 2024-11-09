import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleInsertIntoEmailsError(
  this: AuthnFetchHandler,
  userId: number,
): (err: unknown) => void {
  const startTime: number = this.now();

  const handleCatch = (err: unknown): void => {
    const endTime: number = this.now();
    const duration: number = endTime - startTime;
    this.logError(mapToError(err));

    this.emitPrivateMetric(MetricName.EmailInsertError, {
      duration,
      endTime,
      startTime,
      userId,
    });

    this.emitPublicMetric(MetricName.EmailInsertError, {
      duration,
      endTime,
      startTime,
    });
  };

  return handleCatch;
}
