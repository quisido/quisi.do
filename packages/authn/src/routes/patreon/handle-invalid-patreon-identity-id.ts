import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import handleMissingPatreonIdentityId from './handle-missing-patreon-identity-id.js';

export default function handleInvalidPatreonIdentityId(
  this: Worker,
  data: Record<string, unknown>,
  id: unknown,
): never {
  if (typeof id === 'undefined') {
    return handleMissingPatreonIdentityId.call(this, data);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonIdentityId,
    value: JSON.stringify(id),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonIdentityId,
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityId);
}
