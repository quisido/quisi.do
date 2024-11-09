import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserIdError(
  this: AuthnFetchHandler,
  { authnId, startTime, userId }: Options,
): (error: unknown) => void {
  return (err: unknown): void => {
    const endTime: number = this.now();
    const duration: number = endTime - startTime;

    // If the KV namespace failed, fallback to the memory cache.
    this.setAuthnUserIdInMemory(authnId, userId);

    this.logError(mapToError(err));

    this.emitPrivateMetric(MetricName.AuthnIdError, {
      authnId,
      duration,
      endTime,
      startTime,
      userId,
    });

    this.emitPublicMetric(MetricName.AuthnIdError, {
      duration,
      endTime,
      startTime,
    });
  };
}
