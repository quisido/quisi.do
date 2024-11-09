import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
  description: string,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonAccessTokenRequest);
  this.emitPrivateMetric(MetricName.InvalidPatreonAccessTokenRequest, {
    description,
    value: JSON.stringify({
      ...json,
      error: undefined,
      error_description: undefined,
    }),
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenRequest);
}
