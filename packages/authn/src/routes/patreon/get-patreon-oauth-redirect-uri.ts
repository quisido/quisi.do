import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthRedirectUri(
  this: AuthnFetchHandler,
): string {
  const uri: unknown = this.getEnv('PATREON_OAUTH_REDIRECT_URI');

  if (typeof uri === 'string') {
    return uri;
  }

  if (typeof uri === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonOAuthRedirectUri);
    throw new FatalError(ErrorCode.MissingPatreonOAuthRedirectUri);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthRedirectUri, {
    value: JSON.stringify(uri),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthRedirectUri, {
    type: typeof uri,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthRedirectUri);
}
