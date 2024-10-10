import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidOAuthUserId(
  this: Worker,
  result: Record<string, unknown>,
): never {
  this.emitPublicMetric({ name: MetricName.InvalidOAuthUserId });
  this.emitPrivateMetric({
    name: MetricName.InvalidOAuthUserId,
    value: JSON.stringify(result),
  });

  throw new FatalError(ErrorCode.InvalidOAuthUserId);
}
