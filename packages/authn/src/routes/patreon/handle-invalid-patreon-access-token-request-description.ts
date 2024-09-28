import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenRequestDescription(this: Worker,
  json: Record<string, unknown>,
  description: string,
): never {
  this.emitPublicMetric({ name: MetricName.InvalidPatreonAccessTokenRequest });
  this.emitPrivateMetric({
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
