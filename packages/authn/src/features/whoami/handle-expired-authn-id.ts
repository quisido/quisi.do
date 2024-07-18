import { AUTHN_USER_ID_MAP } from '../../constants/authn-user-id-map.js';
import { MetricName } from '../../constants/metric-name.js';
import getTelemetry from '../../utils/get-telemetry.js';

interface Options {
  readonly authnId: string;
  readonly expiration: number;
  readonly id: number;
}

export default function handleExpiredAuthnId({
  authnId,
  expiration,
  id,
}: Options): void {
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();

  // Clean up! The cache has expired. 🧼
  AUTHN_USER_ID_MAP.delete(authnId);

  emitPublicMetric({
    expiration,
    name: MetricName.ExpiredAuthnId,
  });

  emitPrivateMetric({
    expiration,
    id,
    name: MetricName.ExpiredAuthnId,
  });
}
