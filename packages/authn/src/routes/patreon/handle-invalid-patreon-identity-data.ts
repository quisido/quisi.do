import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';
import handleMissingPatreonIdentityData from './handle-missing-patreon-identity-data.js';

export default function handleInvalidPatreonIdentityData(
  this: AuthnFetchHandler,
  data: unknown,
): never {
  if (typeof data === 'undefined') {
    return handleMissingPatreonIdentityData.call(this);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityData, {
    value: JSON.stringify(data),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityData, {
    type: typeof data,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityData);
}
