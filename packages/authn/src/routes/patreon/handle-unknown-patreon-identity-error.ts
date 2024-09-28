import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonIdentityError(this: Worker,
  status: number,
  identity: unknown,
): never {
  this.emitPrivateMetric({
    identity: JSON.stringify(identity),
    name: MetricName.UnknownPatreonIdentityError,
    status,
  });

  this.emitPublicMetric({
    name: MetricName.UnknownPatreonIdentityError,
    status,
  });

  throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
}
