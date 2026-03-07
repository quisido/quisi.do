import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleInvalidOAuthUserId(
  this: AuthnFetchHandler,
  firstResult: Record<string, unknown>,
): never {
  this.emitPublicMetric(MetricName.InvalidOAuthUserId);
  this.emitPrivateMetric(MetricName.InvalidOAuthUserId, {
    value: JSON.stringify(firstResult),
  });

  throw new FatalError(ErrorCode.InvalidOAuthUserId);
}
