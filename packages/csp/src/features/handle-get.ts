import { GetErrorCode } from '@quisido/csp-shared';
import { AccountNumber, UsageType } from '@quisido/workers-shared';
import { HEADERS_INIT } from '../constants/headers-init.js';
import { StatusCode } from '../constants/status-code.js';
import createAnalyticsEngineDataPoint from '../utils/create-analytics-engine-datapoint.js';
import query from '../utils/query.js';

interface Options {
  readonly console: Console;
  readonly db: D1Database;
  readonly key: string | null;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

const DEFAULT_PROJECT_ID = 0;
const MILLISECONDS_PER_MONTH = 2629746000;
const ONCE = 1;

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

export default async function handleGet({
  console,
  db,
  key,
  projectId,
  usage,
}: Options): Promise<Response> {
  // Key
  if (key === null) {
    console.log('Missing key');
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

  const [keysRow] = await query(
    db,
    SELECT_USER_ID_FROM_KEYS_QUERY,
    key,
    projectId,
  );

  // Not found
  if (typeof keysRow === 'undefined') {
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: AccountNumber.Quisido,
        count: ONCE,
        projectId: DEFAULT_PROJECT_ID,
        usageType: UsageType.D1Read,
      }),
    );

    console.log('Invalid key');
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
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: AccountNumber.Quisido,
        count: ONCE,
        projectId,
        usageType: UsageType.D1Read,
      }),
    );

    console.log('Invalid database project row');
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

  usage.writeDataPoint(
    createAnalyticsEngineDataPoint({
      accountNumber: userId,
      count: ONCE + reports.length,
      projectId,
      usageType: UsageType.D1Read,
    }),
  );

  return new Response(JSON.stringify(reports), {
    headers: new Headers(HEADERS_INIT),
    status: StatusCode.OK,
  });
}
