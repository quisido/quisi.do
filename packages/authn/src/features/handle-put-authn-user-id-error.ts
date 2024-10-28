import { Snapshot } from '@quisido/proposal-async-context';
import type Worker from '@quisido/worker';
import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserIdError(
  this: Worker,
  { authnId, startTime, userId }: Options,
): (error: unknown) => void {
  const snapshot: Snapshot = new Snapshot();

  return (err: unknown): void => {
    snapshot.run((): void => {
      const endTime: number = this.getNow();
      const duration: number = endTime - startTime;

      // If the KV namespace failed, fallback to the memory cache.
      setAuthnUserIdInMemory.call(this, authnId, userId);

      this.logPrivateError(mapToError(err));

      this.emitPrivateMetric({
        authnId,
        duration,
        endTime,
        name: MetricName.AuthnIdError,
        startTime,
        userId,
      });

      this.emitPublicMetric({
        duration,
        endTime,
        name: MetricName.AuthnIdError,
        startTime,
      });
    });
  };
}
