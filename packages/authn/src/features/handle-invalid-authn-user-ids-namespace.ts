import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidAuthnUserIdsNamespace(
  this: Worker,
  namespace: unknown,
): never {
  this.emitPrivateMetric({
    name: MetricName.InvalidAuthnUserIdsNamespace,
    value: JSON.stringify(namespace),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidAuthnUserIdsNamespace,
    type: typeof namespace,
  });

  throw new FatalError(ErrorCode.InvalidAuthnUserIdsNamespace);
}
