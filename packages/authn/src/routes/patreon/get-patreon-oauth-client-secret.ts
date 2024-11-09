import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientSecret(
  this: AuthnFetchHandler,
): string {
  const secret: unknown = this.getEnv('PATREON_OAUTH_CLIENT_SECRET');

  if (typeof secret === 'string') {
    return secret;
  }

  if (typeof secret === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonOAuthClientSecret);
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientSecret);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthClientSecret, {
    value: JSON.stringify(secret),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthClientSecret, {
    type: typeof secret,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthClientSecret);
}
