import { mapUnknownToError } from 'fmrs';
import { Snapshot } from 'proposal-async-context/src/index.js';
import { AUTHN_USER_ID_MAP } from '../constants/authn-user-id-map.js';
import MetricName from '../constants/metric-name.js';
import getTelemetry from '../utils/get-telemetry.js';

interface Options {
  readonly authnId: string;
  readonly expiration: number;
  readonly id: number;
  readonly startTime: number;
}

export default function handlePutAuthnUserIdError({
  authnId,
  expiration,
  id,
  startTime,
}: Options): (error: unknown) => void {
  const snapshot: Snapshot = new Snapshot();

  return (err: unknown): void => {
    // If the KV namespace failed, fallback to the cache.
    AUTHN_USER_ID_MAP.set(authnId, {
      expiration,
      id,
    });

    snapshot.run((): void => {
      const { emitPublicMetric, logPrivateError } = getTelemetry();
      logPrivateError(mapUnknownToError(err));
      emitPublicMetric({
        endTime: Date.now(),
        name: MetricName.AuthnIdError,
        startTime,
      });
    });
  };
}
