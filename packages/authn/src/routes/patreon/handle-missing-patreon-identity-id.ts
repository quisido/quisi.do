import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonIdentityId(
  this: AuthnFetchHandler,
  data: Record<string, unknown>,
): never {
  this.emitPublicMetric(MetricName.MissingPatreonIdentityId);

  this.emitPrivateMetric(MetricName.MissingPatreonIdentityId, {
    data: JSON.stringify(data),
  });

  throw new FatalError(ErrorCode.MissingPatreonIdentityId);
}
