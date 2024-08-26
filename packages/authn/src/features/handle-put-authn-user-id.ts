import { Snapshot } from '@quisido/proposal-async-context';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, getNow } from '../constants/worker.js';
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
    snapshot.run((): void => {
      setAuthnUserIdInMemory(authnId, id);

      emitPublicMetric({
        endTime: getNow(),
        name: MetricName.AuthnIdCreated,
        startTime,
      });
    });
  };
}
