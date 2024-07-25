import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityId(id: unknown): never {
  if (typeof id === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonIdentityId });
    throw new FatalError(ErrorCode.MissingPatreonIdentityId);
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityId,
    value: JSON.stringify(id),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityId,
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityId);
}
