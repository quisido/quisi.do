import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import FatalError from '../utils/fatal-error.js';

export default async function getOAuthUserId(
  this: AuthnFetchHandler,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<number | null> {
  const { results } = await this.getD1Results(
    'AUTHN_DB',
    SELECT_USERID_FROM_OAUTH_QUERY,
    [oAuthProvider, oAuthId],
  );

  // Non-existent user
  const [firstResult] = results;
  if (!isRecord(firstResult)) {
    return null;
  }

  // Malformed database row
  const { userId } = firstResult;
  if (typeof userId !== 'number') {
    this.emitPublicMetric(MetricName.InvalidOAuthUserId);
    this.emitPrivateMetric(MetricName.InvalidOAuthUserId, {
      value: JSON.stringify(firstResult),
    });

    throw new FatalError(ErrorCode.InvalidOAuthUserId);
  }

  // Existent user
  this.emitPrivateMetric(MetricName.AuthenticationRead, { userId });
  this.emitPublicMetric(MetricName.AuthenticationRead);
  return userId;
}
