import { Snapshot } from '@quisido/workers-shared';
import { AUTHN_USER_ID_MAP } from '../constants/authn-user-id-map.js';
import { MetricName } from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';

interface Options {
  readonly authnId: string;
  readonly expiration: number;
  readonly id: number;
  readonly startTime: number;
}

export default function handlePutAuthnUserId({
  authnId,
  expiration,
  id,
  startTime,
}: Options): () => void {
  const snapshot: Snapshot = new Snapshot();

  return (): void => {
    AUTHN_USER_ID_MAP.set(authnId, {
      expiration,
      id,
    });

    snapshot.run((): void => {
      const { emitPublicMetric } = getTelemetry();
      emitPublicMetric({
        endTime: Date.now(),
        name: MetricName.AuthnIdCreated,
        startTime,
      });
    });
  };
}
