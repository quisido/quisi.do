import { GetErrorCode } from '@quisido/csp-shared';
import { StatusCode } from 'cloudflare-utils';
import { HEADERS_INIT } from '../constants/headers-init.js';
import { MetricName } from '../constants/metric-name.js';
import type CspFetchHandler from '../csp-fetch-handler.js';

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

export default async function handleGet(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  // Key
  const key: string | null = this.getRequestSearchParam('key');
  if (key === null) {
    this.emitPublicMetric(MetricName.MissingGetKey);

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

  const {
    results: [keysRow],
  } = await this.getD1Results('CSP_DB', SELECT_USER_ID_FROM_KEYS_QUERY, [
    key,
    projectId,
  ]);

  // Not found
  if (typeof keysRow === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidGetKey);
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
    this.emitPublicMetric(MetricName.InvalidDatabaseProjectRow);
    this.logError(
      new Error(`Invalid database project row: ${projectId.toString()}`),
    );

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

  const { results: reports } = await this.getD1Results(
    'CSP_DB',
    SELECT_REPORTS_QUERY,
    [projectId, Date.now() - MILLISECONDS_PER_MONTH],
  );

  return new Response(JSON.stringify(reports), {
    headers: new Headers(HEADERS_INIT),
    status: StatusCode.OK,
  });
}
