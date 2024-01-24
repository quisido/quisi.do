import type OAuthProvider from '../constants/oauth-provider.js';
import StatusCode from '../constants/status-code.js';
import assert from './assert.js';
import isObject from './is-object.js';

const QUERY = `
SELECT \`userId\`
FROM \`oauth\`
WHERE \`oauthProvider\` = ?
  AND \`oauthId\` = ?
LIMIT 1;
`;

export default async function getUserId(
  db: D1Database,
  oauthProvider: OAuthProvider,
  oauthId: string,
): Promise<number | null> {
  const statement: D1PreparedStatement = db
    .prepare(QUERY)
    .bind(oauthProvider, oauthId);

  const {
    meta: { duration, size_after: sizeAfter },
    results,
    success,
  } = await statement.run();

  // TODO: This needs to be emit and put on /dashboard!
  console.log({
    duration,
    query: 'utils/get-user-id',
    sizeAfter,
    success,
  });

  // if (!success) {
  //   return null;
  // }

  const [firstResult] = results;
  if (!isObject(firstResult)) {
    return null;
  }

  assert(
    'userId' in firstResult,
    'Expected OAuth result to have a user ID.',
    StatusCode.InternalServerError,
  );

  const { userId } = firstResult;
  assert(
    typeof userId === 'number',
    'Expected OAuth user ID to be numeric.',
    StatusCode.InternalServerError,
  );

  return userId;
}
