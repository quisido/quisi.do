import { AccountNumber, UsageType } from "@quisido/workers-shared";
import MetricName from "../constants/metric-name.js";
import type OAuthProvider from "../constants/oauth-provider.js";
import getTelemetry from "../utils/get-telemetry.js";
import getDatabase from "./get-database.js";
import getUsage from "./get-usage.js";
import handleInsertIntoOAuthError from './handle-insert-into-oauth-error.js';
import handleInsertIntoOAuthResponse from './handle-insert-into-oauth-response.js';
import putDatabaseUserEmail from "./put-database-user-email.js";

interface Options {
  readonly changes: number;
  readonly duration: number;
  readonly email: string | null;
  readonly oAuthId: string;
  readonly oAuthProvider: OAuthProvider;
  readonly sizeAfter: number;
  readonly userId: number;
}

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
  const use = getUsage();
  emitPublicMetric({
    changes,
    duration,
    name: MetricName.AuthenticationCreated,
    sizeAfter,
    userId,
  });

  // Associate user ID with OAuth ID.
  use({
    account: AccountNumber.Quisido,
    type: UsageType.D1Write,
  });
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
