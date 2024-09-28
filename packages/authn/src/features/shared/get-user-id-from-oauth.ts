import type Worker from '@quisido/worker';
import type OAuthProvider from '../../constants/oauth-provider.js';
import { SELECT_USERID_FROM_OAUTH_QUERY } from '../../constants/queries.js';
import getDatabase from './get-database.js';

interface Result {
  readonly duration: number;
  readonly results: readonly Record<string, unknown>[];
  readonly rowsRead: number;
  readonly sizeAfter: number;
}

export default async function getUserIdFromOAuth(
  this: Worker,
  oAuthProvider: OAuthProvider,
  oAuthId: string,
): Promise<Result> {
  const db: D1Database = getDatabase.call(this);

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
