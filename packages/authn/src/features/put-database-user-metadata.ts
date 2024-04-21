import MetricName from "../constants/metric-name.js";
import type OAuthProvider from "../constants/oauth-provider.js";
import getTelemetry from "../utils/get-telemetry.js";
import getDatabase from "./get-database.js";
import handleInsertIntoEmailsError from './handle-insert-into-emails-error.js';
import handleInsertIntoEmailsResponse from './handle-insert-into-emails-response.js';
import handleInsertIntoOAuthError from './handle-insert-into-oauth-error.js';
import handleInsertIntoOAuthResponse from './handle-insert-into-oauth-response.js';

interface Options {
  readonly changes: number;
  readonly duration: number;
  readonly email: string | null;
  readonly oAuthId: string;
  readonly oAuthProvider: OAuthProvider;
  readonly sizeAfter: number;
  readonly userId: number;
}

const INSERT_INTO_EMAILS_QUERY = `
INSERT INTO \`emails\` (\`address\`, \`userId\`)
VALUES (?, ?);
`;

const INSERT_INTO_OAUTH_QUERY = `
INSERT INTO \`oauth\` (\`userId\`, \`oAuthProvider\`, \`oAuthId\`)
VALUES (?, ?, ?);
`;

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
  const { affect, emitPublicMetric } = getTelemetry();
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
    const insertIntoEmails: Promise<D1Response> = db
      .prepare(INSERT_INTO_EMAILS_QUERY)
      .bind(email, userId)
      .run();

    affect(
      insertIntoEmails
        .then(handleInsertIntoEmailsResponse(userId))
        .catch(handleInsertIntoEmailsError(userId)),
    );
  }

  return userId;
}
