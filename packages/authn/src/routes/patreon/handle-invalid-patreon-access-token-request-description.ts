import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenRequestDescription(
  json: Record<string, unknown>,
  description: string,
): never {
  emitPublicMetric({ name: MetricName.InvalidPatreonAccessTokenRequest });
  emitPrivateMetric({
    description,
    name: MetricName.InvalidPatreonAccessTokenRequest,
    value: JSON.stringify({
      ...json,
      error: undefined,
      error_description: undefined,
    }),
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenRequest);
}
