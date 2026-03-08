import { StatusCode } from 'cloudflare-utils';
import { mapToError, mapToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import { Permission } from '../constants/permission.js';
import {
  SELECT_PERMISSION_FROM_KEYS,
  SELECT_USER_ID_FROM_PROJECTS,
} from '../constants/queries.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import type { ReportBodyArray } from '../types/report-body-array.js';
import type ReportBody from '../types/report-body.js';
import CspResponse from '../utils/csp-response.js';
import mapReportBodyToArray from '../utils/map-report-body-to-array.js';
import parseReport from '../utils/parse-report.js';

const EMPTY = 0;

const INSERT_INTO = `
INSERT INTO \`reports\` (
  \`projectId\`,
  \`timestamp\`,
  \`documentURL\`,
  \`referrer\`,
  \`blockedURL\`,
  \`effectiveDirective\`,
  \`originalPolicy\`,
  \`sourceFile\`,
  \`sample\`,
  \`disposition\`,
  \`statusCode\`,
  \`lineNumber\`,
  \`columnNumber\`
)
`;

const createSelects = (count: number): string =>
  new Array(count)
    .fill('SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?')
    .join(' UNION ALL ');

const handleMissingKey = (handler: CspFetchHandler): CspResponse => {
  handler.emitPublicMetric(MetricName.MissingPostKey);
  return new CspResponse(StatusCode.BadRequest);
};

const handleMissingProject = (
  handler: CspFetchHandler,
  projectId: number,
): CspResponse => {
  handler.emitPublicMetric(MetricName.PostInvalidProjectId);
  return new CspResponse(
    StatusCode.NotFound,
    `Project "${projectId.toString()}" does not exist.`,
  );
};

const handleInvalidProjectRow = (
  handler: CspFetchHandler,
  projectRow: Record<string, unknown>,
): CspResponse => {
  handler.emitPrivateMetric(MetricName.InvalidDatabaseProjectsRow, {
    row: JSON.stringify(projectRow),
  });

  handler.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
    keys: Object.keys(projectRow).join(', '),
  });

  return new CspResponse(StatusCode.BadGateway);
};

const handleInvalidKeyRow = (
  handler: CspFetchHandler,
  keyRow: Record<string, unknown>,
): CspResponse => {
  handler.emitPrivateMetric(MetricName.InvalidDatabaseKeysRow, {
    row: JSON.stringify(keyRow),
  });

  handler.emitPublicMetric(MetricName.InvalidDatabaseKeysRow, {
    keys: Object.keys(keyRow).join(', '),
  });

  return new CspResponse(StatusCode.BadGateway);
};

const validatePermission = (
  handler: CspFetchHandler,
  keyRow: Record<string, unknown>,
): CspResponse | undefined => {
  const { permission } = keyRow;

  if (permission === Permission.Post) {
    return undefined;
  }

  if (typeof permission !== 'number') {
    return handleInvalidKeyRow(handler, keyRow);
  }

  handler.emitPrivateMetric(MetricName.InvalidPermission, {
    actual: permission,
    expected: Permission.Post,
  });

  return new CspResponse(
    StatusCode.Forbidden,
    'This key is not authorized to post.',
  );
};

const validateProjectRow = (
  handler: CspFetchHandler,
  projectRow: Record<string, unknown> | undefined,
  projectId: number,
): CspResponse | undefined => {
  if (typeof projectRow === 'undefined') {
    return handleMissingProject(handler, projectId);
  }

  const { userId } = projectRow;
  if (typeof userId !== 'number') {
    return handleInvalidProjectRow(handler, projectRow);
  }

  return undefined;
};

const validateKeyRow = (
  handler: CspFetchHandler,
  keyRow: Record<string, unknown> | undefined,
): CspResponse | undefined => {
  if (typeof keyRow === 'undefined') {
    handler.emitPublicMetric(MetricName.InvalidPostKey);
    return new CspResponse(StatusCode.Forbidden, 'The POST key is invalid.');
  }

  return validatePermission(handler, keyRow);
};

const validatePostAuthorization = async (
  handler: CspFetchHandler,
  projectId: number,
): Promise<CspResponse | undefined> => {
  const key: string | null = handler.getRequestSearchParam('key');
  if (key === null) {
    return handleMissingKey(handler);
  }

  // eslint-disable-next-line no-magic-numbers
  const [[keyRow], [projectRow]] = await handler.queries<2>('CSP_DB', [
    [SELECT_PERMISSION_FROM_KEYS, key, projectId],
    [SELECT_USER_ID_FROM_PROJECTS, projectId],
  ]);

  const projectError: CspResponse | undefined = validateProjectRow(
    handler,
    projectRow,
    projectId,
  );
  if (projectError !== undefined) {
    return projectError;
  }

  return validateKeyRow(handler, keyRow);
};

const processReports = (
  handler: CspFetchHandler,
  reports: readonly ReportBody[],
  projectId: number,
): CspResponse => {
  if (reports.length === EMPTY) {
    handler.emitPublicMetric(MetricName.EmptyReports);
    return new CspResponse(StatusCode.BadRequest);
  }

  const mapReportBodyToInsertValues = (
    body: ReportBody,
  ): readonly [number, number, ...ReportBodyArray] => [
    projectId,
    Date.now(),
    ...mapReportBodyToArray(body),
  ];

  const selects: string = createSelects(reports.length);
  const values = reports.flatMap(mapReportBodyToInsertValues);
  handler.affect(
    handler.getD1Response('CSP_DB', `${INSERT_INTO} ${selects}`, values),
  );

  return new CspResponse(StatusCode.OK);
};

const handleRequestError = (
  handler: CspFetchHandler,
  err: unknown,
): CspResponse => {
  const error: Error = mapToError(err);
  handler.emitPublicMetric(MetricName.UnknownError);
  handler.logError(error);
  handler.emitPrivateMetric(MetricName.UnknownError, {
    message: mapToString(err),
  });

  return new CspResponse(StatusCode.BadRequest);
};

export default async function handlePost(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  const authError: CspResponse | undefined = await validatePostAuthorization(
    this,
    projectId,
  );
  if (authError !== undefined) {
    return authError;
  }

  try {
    const text: string = await this.getRequestText();
    const reports: readonly ReportBody[] = parseReport(text);
    return processReports(this, reports, projectId);
  } catch (err: unknown) {
    return handleRequestError(this, err);
  }
}
