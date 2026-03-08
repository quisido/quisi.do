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

const handleMissingKey = (handler: CspFetchHandler): CspResponse => {
  handler.emitPublicMetric(MetricName.MissingGetKey);
  return new CspResponse(StatusCode.BadRequest, {
    code: GetErrorCode.MissingKey,
  });
};

const handleInvalidKey = (handler: CspFetchHandler): CspResponse => {
  handler.emitPublicMetric(MetricName.InvalidGetKey);
  return new CspResponse(StatusCode.NotFound, {
    code: GetErrorCode.InvalidKey,
  });
};

const handleInvalidProjectRow = (
  handler: CspFetchHandler,
  projectId: number,
): CspResponse => {
  handler.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
    projectId,
  });

  handler.logError(
    new Error(
      `The database row for project ID "${projectId.toString()}" is invalid.`,
    ),
  );

  return new CspResponse(StatusCode.BadGateway, {
    code: GetErrorCode.InvalidDatabaseProjectRow,
  });
};

const validateKeysRow = (
  handler: CspFetchHandler,
  keysRow: Record<string, unknown> | undefined,
  projectId: number,
): CspResponse | undefined => {
  if (typeof keysRow === 'undefined') {
    return handleInvalidKey(handler);
  }

  const { userId } = keysRow;
  if (typeof userId !== 'number') {
    return handleInvalidProjectRow(handler, projectId);
  }

  return undefined;
};

export default async function handleGet(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  const key: string | null = this.getRequestSearchParam('key');
  if (key === null) {
    return handleMissingKey(this);
  }

  const {
    results: [keysRow],
  } = await this.getD1Results('CSP_DB', SELECT_USER_ID_FROM_KEYS_QUERY, [
    key,
    projectId,
  ]);

  const keysError: CspResponse | undefined = validateKeysRow(
    this,
    keysRow,
    projectId,
  );
  if (keysError !== undefined) {
    return keysError;
  }

  const { results: reports } = await this.getD1Results(
    'CSP_DB',
    SELECT_REPORTS_QUERY,
    [projectId, Date.now() - MILLISECONDS_PER_MONTH],
  );

  return new CspResponse(StatusCode.OK, reports);
}
