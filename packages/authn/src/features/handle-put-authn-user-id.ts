import { Snapshot } from '@quisido/proposal-async-context';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric } from '../constants/worker.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly id: number;
  readonly startTime: number;
}

export default function handlePutAuthnUserId({
  authnId,
  id,
  startTime,
}: Options): () => void {
  const snapshot: Snapshot = new Snapshot();

  return (): void => {
    setAuthnUserIdInMemory(authnId, id);

    snapshot.run((): void => {
      emitPublicMetric({
        endTime: Date.now(),
        name: MetricName.AuthnIdCreated,
        startTime,
      });
    });
  };
}
