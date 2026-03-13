import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function handleStringPatreonTokenRequestDescription(
  this: AuthnFetchHandler,
  json: Record<string, unknown>,
  description: string,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonTokenRequest);
  this.emitPrivateMetric(MetricName.InvalidPatreonTokenRequest, {
    description,
    value: JSON.stringify({
      ...json,
      error: undefined,
      error_description: undefined,
    }),
  });

  throw new FatalError(ErrorCode.InvalidPatreonTokenRequest);
}
