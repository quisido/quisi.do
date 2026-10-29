import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityData(
  this: AuthnFetchHandler,
  data: unknown,
): never {
  if (typeof data === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonIdentityData);
    throw new FatalError(ErrorCode.MissingPatreonIdentityData);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityData, {
    value: JSON.stringify(data),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityData, {
    type: typeof data,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityData);
}
