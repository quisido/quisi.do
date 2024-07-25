import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonIdentityError(
  status: number,
  identity: unknown,
): never {
  emitPrivateMetric({
    identity: JSON.stringify(identity),
    name: MetricName.UnknownPatreonIdentityError,
    status,
  });

  emitPublicMetric({
    name: MetricName.UnknownPatreonIdentityError,
    status,
  });

  throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
}
