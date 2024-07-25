import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidInvalidPatreonAccessTokenRequestDescription(
  json: Record<string, unknown>,
  description: unknown,
): never {
  emitPrivateMetric({
    name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  emitPublicMetric({
    name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
    type: typeof description,
  });

  throw new FatalError(
    ErrorCode.InvalidInvalidPatreonAccessTokenRequestDescription,
  );
}
