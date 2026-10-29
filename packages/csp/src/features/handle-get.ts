import { GetErrorCode } from '@quisido/csp-shared';
import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../constants/metric-name.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import CspResponse from '../utils/csp-response.js';

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

    return new CspResponse(StatusCode.BadRequest, {
      code: GetErrorCode.MissingKey,
    });
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
    return new CspResponse(StatusCode.NotFound, {
      code: GetErrorCode.InvalidKey,
    });
  }

  // Bad gateway
  const { userId } = keysRow;
  if (typeof userId !== 'number') {
    this.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
      projectId,
    });

    const projectIdStr: string = projectId.toString();
    this.logError(
      new Error(
        `The database row for project ID "${projectIdStr}" is invalid.`,
      ),
    );

    return new CspResponse(StatusCode.BadGateway, {
      code: GetErrorCode.InvalidDatabaseProjectRow,
    });
  }

  const { results: reports } = await this.getD1Results(
    'CSP_DB',
    SELECT_REPORTS_QUERY,
    [projectId, Date.now() - MILLISECONDS_PER_MONTH],
  );

  return new CspResponse(StatusCode.OK, reports);
}
