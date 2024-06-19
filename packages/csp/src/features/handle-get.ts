import { AccountNumber, Product, UsageType } from '@quisido/workers-shared';
import { HEADERS_INIT } from '../constants/headers-init.js';
import { StatusCode } from '../constants/status-code.js';
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
const SINGLE = 1;
const TWICE = 2;

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
    return new Response('{"code":1}', {
      headers: new Headers(HEADERS_INIT),
      status: StatusCode.BadRequest,
    });
  }

  const [result] = await query(
    db,
    SELECT_USER_ID_FROM_KEYS_QUERY,
    key,
    projectId,
  );

  // Not found
  if (typeof result === 'undefined') {
    usage.writeDataPoint({
      indexes: [AccountNumber.Quisido.toString()],

      doubles: [
        Product.ContentSecurityPolicy,
        DEFAULT_PROJECT_ID,
        UsageType.D1Read,
        ONCE,
        SINGLE,
      ],
    });

    console.log('Missing key');
    return new Response('{"code":2}', {
      headers: new Headers(HEADERS_INIT),
      status: StatusCode.NotFound,
    });
  }

  // Bad gateway
  const { userId } = result;
  if (typeof userId !== 'number') {
    usage.writeDataPoint({
      indexes: [AccountNumber.Quisido.toString()],

      doubles: [
        Product.ContentSecurityPolicy,
        projectId,
        UsageType.D1Read,
        ONCE,
        SINGLE,
      ],
    });

    console.log('Invalid database table row');
    return new Response('{"code":3}', {
      headers: new Headers(HEADERS_INIT),
      status: StatusCode.BadGateway,
    });
  }

  const reports: Record<string, unknown>[] = await query(
    db,
    SELECT_REPORTS_QUERY,
    projectId,
    Date.now() - MILLISECONDS_PER_MONTH,
  );

  usage.writeDataPoint({
    indexes: [userId.toString()],

    doubles: [
      Product.ContentSecurityPolicy,
      projectId,
      UsageType.D1Read,
      TWICE,
      SINGLE,
    ],
  });

  return new Response(JSON.stringify(reports), {
    headers: new Headers(HEADERS_INIT),
    status: StatusCode.OK,
  });
}
