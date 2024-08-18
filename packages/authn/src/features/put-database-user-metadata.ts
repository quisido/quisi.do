import { MetricName } from '../constants/metric-name.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import { INSERT_INTO_OAUTH_QUERY } from '../constants/queries.js';
import { affect, emitPublicMetric } from '../constants/worker.js';
import handleInsertIntoOAuthError from './handle-insert-into-oauth-error.js';
import handleInsertIntoOAuthResponse from './handle-insert-into-oauth-response.js';
import putDatabaseUserEmail from './put-database-user-email.js';
import getDatabase from './shared/get-database.js';

interface Options {
  readonly changes: number;
  readonly duration: number;
  readonly email: string | null;
  readonly oAuthId: string;
  readonly oAuthProvider: OAuthProvider;
  readonly sizeAfter: number;
  readonly userId: number;
}

export default function putDatabaseUserMetadata({
  changes,
  duration,
  email,
  oAuthId,
  oAuthProvider,
  sizeAfter,
  userId,
}: Options): number {
  const db: D1Database = getDatabase();
  emitPublicMetric({
    changes,
    duration,
    name: MetricName.AuthenticationCreated,
    sizeAfter,
    userId,
  });

  // Associate user ID with OAuth ID.
  const insertIntoOAuth: Promise<D1Response> = db
    .prepare(INSERT_INTO_OAUTH_QUERY)
    .bind(userId, oAuthProvider, oAuthId)
    .run();

  affect(
    insertIntoOAuth
      .then(handleInsertIntoOAuthResponse(userId))
      .catch(handleInsertIntoOAuthError(userId)),
  );

  // Associate user ID with email.
  if (email !== null) {
    putDatabaseUserEmail({ email, userId });
  }

  return userId;
}
