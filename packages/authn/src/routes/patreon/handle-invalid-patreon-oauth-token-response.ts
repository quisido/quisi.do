import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthTokenResponse(
  this: AuthnFetchHandler,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonOAuthTokenResponse);
  throw new FatalError(ErrorCode.InvalidPatreonOAuthTokenResponse);
}
