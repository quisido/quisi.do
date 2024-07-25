import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentity(identity: unknown): never {
  emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentity,
    value: JSON.stringify(identity),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonIdentity,
    type: typeof identity,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentity);
}
