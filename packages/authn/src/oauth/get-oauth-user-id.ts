import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../constants/queries.js';
import handleInvalidOAuthUserId from './handle-invalid-oauth-user-id.js';

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
    handleInvalidOAuthUserId.call(this, firstResult);
  }

  // Existent user
  this.emitPrivateMetric(MetricName.AuthenticationRead, { userId });
  this.emitPublicMetric(MetricName.AuthenticationRead);
  return userId;
}
