import { MetricName } from '../constants/metric-name.js';
import { type OAuthProvider } from '../constants/oauth-provider.js';
import { INSERT_INTO_OAUTH_QUERY } from '../constants/queries.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';
import handleInsertIntoOAuthError from './handle-insert-into-oauth-error.js';
import handleInsertIntoOAuthResponse from './handle-insert-into-oauth-response.js';
import putDatabaseUserEmail from './put-database-user-email.js';

interface Options {
  readonly changes: number;
  readonly duration: number;
  readonly email: string | null;
  readonly oAuthId: string;
  readonly oAuthProvider: OAuthProvider;
  readonly sizeAfter: number;
  readonly userId: number;
}

export default function putDatabaseUserMetadata(
  this: AuthnFetchHandler,
  {
    changes,
    duration,
    email,
    oAuthId,
    oAuthProvider,
    sizeAfter,
    userId,
  }: Options,
): number {
  this.emitPublicMetric(MetricName.AuthenticationCreated, {
    changes,
    duration,
    sizeAfter,
    userId,
  });

  // Associate user ID with OAuth ID.
  const insertIntoOAuth: Promise<D1Response> = this.query(
    INSERT_INTO_OAUTH_QUERY,
    [userId, oAuthProvider, oAuthId],
  );

  this.affect(
    insertIntoOAuth
      .then(handleInsertIntoOAuthResponse.call(this, userId))
      .catch(handleInsertIntoOAuthError.call(this, userId)),
  );

  // Associate user ID with email.
  if (email !== null) {
    putDatabaseUserEmail.call(this, { email, userId });
  }

  return userId;
}
