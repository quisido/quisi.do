import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityId(
  this: AuthnFetchHandler,
  data: Record<string, unknown>,
  id: unknown,
): never {
  const { emitPrivateMetric, emitPublicMetric } = this;
  if (typeof id === 'undefined') {
    emitPublicMetric(MetricName.MissingPatreonIdentityId);
    emitPrivateMetric(MetricName.MissingPatreonIdentityId, {
      data: JSON.stringify(data),
    });

    throw new FatalError(ErrorCode.MissingPatreonIdentityId);
  }

  emitPrivateMetric(MetricName.InvalidPatreonIdentityId, {
    value: JSON.stringify(id),
  });

  emitPublicMetric(MetricName.InvalidPatreonIdentityId, {
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidPatreonIdentityId);
}
