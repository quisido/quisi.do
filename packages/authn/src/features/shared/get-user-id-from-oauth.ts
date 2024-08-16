import type OAuthProvider from '../../constants/oauth-provider.js';
import getDatabase from './get-database.js';

interface Result {
  readonly duration: number;
  readonly results: readonly Record<string, unknown>[];
  readonly rowsRead: number;
  readonly sizeAfter: number;
}

const SELECT_USERID_FROM_OAUTH_QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oAuthProvider\` = ?
  AND \`oAuthId\` = ?
LIMIT 1;
`;

export default async function getUserIdFromOAuth(
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<Result> {
  const db: D1Database = getDatabase();

  const statement: D1PreparedStatement = db
    .prepare(SELECT_USERID_FROM_OAUTH_QUERY)
    .bind(oAuthProvider, oAuthId);

  const {
    meta: { duration, rows_read: rowsRead, size_after: sizeAfter },
    results,
  } = await statement.all();

  return {
    duration,
    results,
    rowsRead,
    sizeAfter,
  };
}