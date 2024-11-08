import { Snapshot } from '@quisido/proposal-async-context';
import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserId(
  this: Worker,
  { authnId, startTime, userId }: Options,
): () => void {
  const snapshot: Snapshot = new Snapshot();

  return (): void => {
    snapshot.run((): void => {
      setAuthnUserIdInMemory.call(this, authnId, userId);

      this.emitPublicMetric({
        endTime: this.now(),
        name: MetricName.AuthnIdCreated,
        startTime,
      });
    });
  };
}
