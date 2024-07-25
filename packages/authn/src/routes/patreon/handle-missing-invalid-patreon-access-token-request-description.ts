import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingInvalidPatreonAccessTokenRequestDescription(
  json: Record<string, unknown>,
): never {
  emitPrivateMetric({
    name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  emitPublicMetric({
    name: MetricName.MissingInvalidPatreonAccessTokenRequestDescription,
  });

  throw new FatalError(
    ErrorCode.MissingInvalidPatreonAccessTokenRequestDescription,
  );
}
