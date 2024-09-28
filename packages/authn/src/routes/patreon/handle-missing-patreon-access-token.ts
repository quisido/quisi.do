import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessToken(this: Worker,
  token: Record<string, unknown>,
): never {
  this.emitPublicMetric({ name: MetricName.MissingPatreonAccessToken });
  this.emitPrivateMetric({
    name: MetricName.MissingPatreonAccessToken,
    value: JSON.stringify(token),
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessToken);
}
