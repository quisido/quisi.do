import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessToken(
  accessToken: unknown,
): never {
  emitPrivateMetric({
    name: MetricName.InvalidPatreonAccessToken,
    value: JSON.stringify(accessToken),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonAccessToken,
    type: typeof accessToken,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessToken);
}
