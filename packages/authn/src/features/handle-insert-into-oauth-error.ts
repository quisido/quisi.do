import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function handleInsertIntoOAuthError(
  this: AuthnFetchHandler,
  userId: number,
): (err: unknown) => void {
  const startTime: number = this.now();

  const handleCatch = (err: unknown): void => {
    const endTime: number = this.now();
    this.logError(mapToError(err));

    this.emitPrivateMetric(MetricName.OAuthInsertError, {
      duration: endTime - startTime,
      endTime,
      startTime,
      userId,
    });

    this.emitPublicMetric(MetricName.OAuthInsertError, {
      duration: endTime - startTime,
      endTime,
      startTime,
    });
  };

  return handleCatch;
}
