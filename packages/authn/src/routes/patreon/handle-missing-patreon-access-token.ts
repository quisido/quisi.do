import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessToken(
  token: Record<string, unknown>,
): never {
  emitPublicMetric({ name: MetricName.MissingPatreonAccessToken });
  emitPrivateMetric({
    name: MetricName.MissingPatreonAccessToken,
    value: JSON.stringify(token),
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessToken);
}
