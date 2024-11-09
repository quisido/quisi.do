import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientId(
  this: AuthnFetchHandler,
): string {
  const clientId: unknown = this.getEnv('PATREON_OAUTH_CLIENT_ID');

  if (typeof clientId === 'string') {
    return clientId;
  }

  if (typeof clientId === 'undefined') {
    this.emitPublicMetric(MetricName.MissingPatreonOAuthClientId);
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientId);
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthClientId, {
    value: JSON.stringify(clientId),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthClientId, {
    type: typeof clientId,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthClientId);
}
