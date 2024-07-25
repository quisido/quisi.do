import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidOAuthUserId(
  result: Record<string, unknown>,
): never {
  emitPublicMetric({ name: MetricName.InvalidOAuthUserId });
  emitPrivateMetric({
    name: MetricName.InvalidOAuthUserId,
    value: JSON.stringify(result),
  });

  throw new FatalError(ErrorCode.InvalidOAuthUserId);
}
