import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentity(this: Worker, identity: unknown): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentity,
    value: JSON.stringify(identity),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonIdentity,
    type: typeof identity,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentity);
}
