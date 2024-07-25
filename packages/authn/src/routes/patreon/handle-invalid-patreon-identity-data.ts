import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityData(data: unknown): never {
  if (typeof data === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonIdentityData });
    throw new FatalError(ErrorCode.MissingPatreonIdentityData);
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityData,
    value: JSON.stringify(data),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityData,
    type: typeof data,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityData);
}
