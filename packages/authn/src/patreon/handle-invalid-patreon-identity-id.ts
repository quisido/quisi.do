import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityId(
  this: AuthnFetchHandler,
  data: Record<string, unknown>,
  id: unknown,
): never {
  if (typeof id === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonIdentityId);
    this.emitPrivateMetric(MetricName.MissingPatreonIdentityId, {
      data: JSON.stringify(data),
    });

    throw new FatalError(ErrorCode.MissingPatreonIdentityId);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonIdentityId, {
    value: JSON.stringify(id),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonIdentityId, {
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityId);
}
