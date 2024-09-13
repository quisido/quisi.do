import { Snapshot } from '@quisido/proposal-async-context';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric, getNow, logPrivateError } from '../constants/worker.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserIdError({
  authnId,
  startTime,
  userId,
}: Options): (error: unknown) => void {
  const snapshot: Snapshot = new Snapshot();

  return (err: unknown): void => {
    snapshot.run((): void => {
      const endTime: number = getNow();
      const duration: number = endTime - startTime;

      // If the KV namespace failed, fallback to the memory cache.
      setAuthnUserIdInMemory(authnId, userId);

      logPrivateError(mapUnknownToError(err));

      emitPrivateMetric({
        authnId,
        duration,
        endTime,
        name: MetricName.AuthnIdError,
        startTime,
        userId,
      });

      emitPublicMetric({
        duration,
        endTime,
        name: MetricName.AuthnIdError,
        startTime,
      });
    });
  };
}
