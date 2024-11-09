import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';
import handleMissingPatreonIdentityId from './handle-missing-patreon-identity-id.js';

export default function handleInvalidPatreonIdentityId(
  this: AuthnFetchHandler,
  data: Record<string, unknown>,
  id: unknown,
): never {
  if (typeof id === 'undefined') {
    return handleMissingPatreonIdentityId.call(this, data);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityId, {
    value: JSON.stringify(id),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityId, {
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityId);
}
