import ErrorCode from '../constants/error-code.js';
import MetricName from '../constants/metric-name.js';
import type OAuthProvider from '../constants/oauth-provider.js';
import StatusCode from '../constants/status-code.js';
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
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
  assert: (
    assertion: boolean,
    message: string,
    code: ErrorCode,
    status: StatusCode,
    data?: unknown,
  ) => asserts assertion,
): Promise<number | null> {
  const statement: D1PreparedStatement = db
    .prepare(QUERY)
    .bind(oauthProvider, oauthId);

  const {
    meta: { duration, size_after: sizeAfter },
    results,
  } = await statement.run();

  emit(MetricName.OAuthUserIdSelected, null, {
    duration,
    sizeAfter,
  });

  const [firstResult] = results;
  if (!isObject(firstResult)) {
    return null;
  }

  assert(
    'userId' in firstResult,
    'Expected OAuth result to have a user ID.',
    ErrorCode.MissingOAuthUserId,
    StatusCode.InternalServerError,
  );

  const { userId } = firstResult;
  assert(
    typeof userId === 'number',
    'Expected OAuth user ID to be numeric.',
    ErrorCode.NonNumberOAuthUserId,
    StatusCode.InternalServerError,
  );

  return userId;
}
