import { Snapshot } from '@quisido/proposal-async-context';
import { MetricName } from '../constants/metric-name.js';
import { emitPublicMetric, getNow } from '../constants/worker.js';
import { setAuthnUserIdInMemory } from './authn-user-id.js';

interface Options {
  readonly authnId: string;
  readonly startTime: number;
  readonly userId: number;
}

export default function handlePutAuthnUserId({
  authnId,
  startTime,
  userId,
}: Options): () => void {
  const snapshot: Snapshot = new Snapshot();

  return (): void => {
    snapshot.run((): void => {
      setAuthnUserIdInMemory(authnId, userId);

      emitPublicMetric({
        endTime: getNow(),
        name: MetricName.AuthnIdCreated,
        startTime,
      });
    });
  };
}
