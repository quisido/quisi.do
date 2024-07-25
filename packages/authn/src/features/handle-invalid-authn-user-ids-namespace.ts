import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../constants/worker.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidAuthnUserIdsNamespace(
  namespace: unknown,
): never {
  emitPrivateMetric({
    name: MetricName.InvalidAuthnUserIdsNamespace,
    value: JSON.stringify(namespace),
  });

  emitPublicMetric({
    name: MetricName.InvalidAuthnUserIdsNamespace,
    type: typeof namespace,
  });

  throw new FatalError(ErrorCode.InvalidAuthnUserIdsNamespace);
}
