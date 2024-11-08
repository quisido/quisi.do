import { GetErrorCode } from '@quisido/csp-shared';
import { StatusCode } from 'cloudflare-utils';
import { HEADERS_INIT } from '../constants/headers-init.js';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPublicMetric,
  getD1Database,
  getRequestSearchParam,
  logPrivateError,
} from '../constants/worker.js';
import query from '../utils/query.js';

const MILLISECONDS_PER_MONTH = 2629746000;

const SELECT_USER_ID_FROM_KEYS_QUERY = `
SELECT \`projects\`.\`userId\`
FROM \`keys\`
LEFT JOIN \`projects\`
ON \`projects\`.\`projectId\` = \`keys\`.\`projectId\`
WHERE \`keys\`.\`key\` = ?
AND \`keys\`.\`projectId\` = ?;
`;

const SELECT_REPORTS_QUERY = `
SELECT
  \`blockedURL\`,
  \`columnNumber\`,
  \`disposition\`,
  \`documentURL\`,
  \`effectiveDirective\`,
  \`lineNumber\`,
  \`referrer\`,
  \`sourceFile\`,
  \`statusCode\`
FROM \`reports\`
WHERE \`projectId\` = ?
AND \`timestamp\` > ?;
`;

export default async function handleGet(projectId: number): Promise<Response> {
  // Key
  const key: string | null = getRequestSearchParam('key');
  if (key === null) {
    emitPublicMetric({
      name: MetricName.MissingGetKey,
    });

    return new Response(
      JSON.stringify({
        code: GetErrorCode.MissingKey,
      }),
      {
        headers: new Headers(HEADERS_INIT),
        status: StatusCode.BadRequest,
      },
    );
  }

  const db: D1Database = getD1Database('CSP_DB');
  const [keysRow] = await query(
    db,
    SELECT_USER_ID_FROM_KEYS_QUERY,
    key,
    projectId,
  );

  // Not found
  if (typeof keysRow === 'undefined') {
    emitPublicMetric({
      name: MetricName.InvalidGetKey,
    });

    // Use({
    //   Account: AccountNumber.quisido,
    //   Project: DEFAULT_PROJECT_ID,
    //   Type: UsageType.D1Read,
    // });

    return new Response(
      JSON.stringify({
        code: GetErrorCode.InvalidKey,
      }),
      {
        headers: new Headers(HEADERS_INIT),
        status: StatusCode.NotFound,
      },
    );
  }

  // Bad gateway
  const { userId } = keysRow;
  if (typeof userId !== 'number') {
    emitPublicMetric({
      name: MetricName.InvalidDatabaseProjectRow,
    });

    logPrivateError(
      new Error(`Invalid database project row: ${projectId.toString()}`),
    );

    // Use({
    //   Account: AccountNumber.quisido,
    //   Project: DEFAULT_PROJECT_ID,
    //   Type: UsageType.D1Read,
    // });

    return new Response(
      JSON.stringify({
        code: GetErrorCode.InvalidDatabaseProjectRow,
      }),
      {
        headers: new Headers(HEADERS_INIT),
        status: StatusCode.BadGateway,
      },
    );
  }

  const reports: readonly Record<string, unknown>[] = await query(
    db,
    SELECT_REPORTS_QUERY,
    projectId,
    Date.now() - MILLISECONDS_PER_MONTH,
  );

  // Use({
  //   Account: userId,
  //   Count: ONCE + reports.length,
  //   Project: projectId,
  //   Type: UsageType.D1Read,
  // });

  return new Response(JSON.stringify(reports), {
    headers: new Headers(HEADERS_INIT),
    status: StatusCode.OK,
  });
}
