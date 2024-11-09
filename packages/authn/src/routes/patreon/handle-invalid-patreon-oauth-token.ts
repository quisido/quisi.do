import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonOAuthToken(
  this: AuthnFetchHandler,
  token: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
    value: JSON.stringify(token),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthToken, {
    type: typeof token,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
}
