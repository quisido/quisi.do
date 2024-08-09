import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';
import handleMissingPatreonIdentityId from './handle-missing-patreon-identity-id.js';

export default function handleInvalidPatreonIdentityId(
  data: Record<string, unknown>,
  id: unknown,
): never {
  if (typeof id === 'undefined') {
    return handleMissingPatreonIdentityId(data);
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
