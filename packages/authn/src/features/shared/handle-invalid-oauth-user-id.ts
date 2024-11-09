import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default function handleInvalidOAuthUserId(
  this: AuthnFetchHandler,
  result: Record<string, unknown>,
): never {
  this.emitPublicMetric(MetricName.InvalidOAuthUserId);
  this.emitPrivateMetric(MetricName.InvalidOAuthUserId, {
    value: JSON.stringify(result),
  });

  throw new FatalError(ErrorCode.InvalidOAuthUserId);
}
