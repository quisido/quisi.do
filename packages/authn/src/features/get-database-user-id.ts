import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import getTelemetry from '../utils/get-telemetry.js';
import isObject from '../utils/is-object.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import getDatabase from './get-database.js';

const SELECT_USERID_FROM_OAUTH_QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oAuthProvider\` = ?
  AND \`oAuthId\` = ?
LIMIT 1;
`;

export default async function getDatabaseUserId(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<number | null> {
  const db: D1Database = getDatabase();
  const { emitPrivateMetric, emitPublicMetric } = getTelemetry();

  const statement: D1PreparedStatement = db
    .prepare(SELECT_USERID_FROM_OAUTH_QUERY)
    .bind(oAuthProvider, oAuthId);

  const {
    meta: { duration, rows_read: rowsRead, size_after: sizeAfter },
    results,
  } = await statement.all();

  emitPublicMetric({
    duration,
    name: MetricName.OAuthUserIdSelected,
    rowsRead,
    sizeAfter,
  });

  // Non-existent user
  const [firstResult] = results;
  if (!isObject(firstResult)) {
    return null;
  }

  // Existent user
  const { userId } = firstResult;
  if (typeof userId === 'number') {
    emitPrivateMetric({ name: MetricName.AuthenticationRead, userId });
    emitPublicMetric({ name: MetricName.AuthenticationRead });
    return userId;
  }

  // This should never happen. The query would not match the table schema.
  throw mapCauseToError({
    code: ErrorCode.InvalidUserId,
    privateData: firstResult,
    publicData: typeof userId,
  });
}
