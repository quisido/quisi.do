import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserId(
  this: AuthnFetchHandler,
  { authnId, startTime, userId }: Options,
): () => void {
  return (): void => {
    this.setAuthnUserIdInMemory(authnId, userId);

    this.emitPublicMetric(MetricName.AuthnIdCreated, {
      endTime: this.now(),
      startTime,
    });
  };
}
