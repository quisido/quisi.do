import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityData(
  this: AuthnFetchHandler,
  data: unknown,
): never {
  const { emitPrivateMetric, emitPublicMetric } = this;
  if (typeof data === 'undefined') {
    emitPublicMetric(MetricName.MissingPatreonIdentityData);
    throw new FatalError(ErrorCode.MissingPatreonIdentityData);
  }

  emitPrivateMetric(MetricName.InvalidPatreonIdentityData, {
    value: JSON.stringify(data),
  });

  emitPublicMetric(MetricName.InvalidPatreonIdentityData, {
    type: typeof data,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityData);
}
