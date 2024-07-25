import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthToken(token: unknown): never {
  emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthToken,
    value: JSON.stringify(token),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthToken,
    type: typeof token,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
}
