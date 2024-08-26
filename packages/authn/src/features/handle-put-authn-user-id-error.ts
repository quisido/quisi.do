import { Snapshot } from '@quisido/proposal-async-context';
import { mapUnknownToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, getNow, logPrivateError } from '../constants/worker.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly id: number;
  readonly startTime: number;
}

export default function handlePutAuthnUserIdError({
  authnId,
  id,
  startTime,
}: Options): (error: unknown) => void {
  const snapshot: Snapshot = new Snapshot();

  return (err: unknown): void => {
    snapshot.run((): void => {
      // If the KV namespace failed, fallback to the memory cache.
      setAuthnUserIdInMemory(authnId, id);

      const endTime: number = getNow();
      logPrivateError(mapUnknownToError(err));
      emitPublicMetric({
        endTime,
        name: MetricName.AuthnIdError,
        startTime,
      });
    });
  };
}
