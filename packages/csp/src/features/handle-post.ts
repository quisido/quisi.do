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

export default async function handlePost(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  // Key
  const key: string | null = this.getRequestSearchParam('key');
  if (key === null) {
    this.emitPublicMetric(MetricName.MissingPostKey);
    return new CspResponse(StatusCode.BadRequest);
  }

  // Queries
  const [[keyRow], [projectRow]] = await this.queries<2>('CSP_DB', [
    [SELECT_PERMISSION_FROM_KEYS, key, projectId],
    [SELECT_USER_ID_FROM_PROJECTS, projectId],
  ]);

  // Project not found
  if (typeof projectRow === 'undefined') {
    const projectIdStr: string = projectId.toString();
    this.emitPublicMetric(MetricName.PostInvalidProjectId);
    return new CspResponse(
      StatusCode.NotFound,
      `Project "${projectIdStr}" does not exist.`,
    );
  }

  // Bad gateway
  const { userId } = projectRow;
  if (typeof userId !== 'number') {
    this.emitPrivateMetric(MetricName.InvalidDatabaseProjectsRow, {
      row: JSON.stringify(projectRow),
    });

    this.emitPublicMetric(MetricName.InvalidDatabaseProjectsRow, {
      keys: Object.keys(projectRow).join(', '),
    });

    return new CspResponse(StatusCode.BadGateway);
  }

  // Key not found
  if (typeof keyRow === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPostKey);
    return new CspResponse(StatusCode.Forbidden, 'The POST key is invalid.');
  }

  // Bad permission
  const { permission } = keyRow;
  if (permission !== Permission.Post) {
    if (typeof permission !== 'number') {
      this.emitPrivateMetric(MetricName.InvalidDatabaseKeysRow, {
        row: JSON.stringify(keyRow),
      });

      this.emitPublicMetric(MetricName.InvalidDatabaseKeysRow, {
        keys: Object.keys(keyRow).join(', '),
      });

      return new CspResponse(StatusCode.BadGateway);
    }

    this.emitPrivateMetric(MetricName.InvalidPermission, {
      actual: permission,
      expected: Permission.Post,
    });

    return new CspResponse(
      StatusCode.Forbidden,
      'This key is not authorized to post.',
    );
  }

  const mapReportBodyToInsertValues = (
    body: ReportBody,
  ): readonly [number, number, ...ReportBodyArray] => [
    projectId,
    Date.now(),
    ...mapReportBodyToArray(body),
  ];

  try {
    const text: string = await this.getRequestText();
    const reports: readonly ReportBody[] = parseReport(text);
    if (reports.length === EMPTY) {
      this.emitPublicMetric(MetricName.EmptyReports);
      return new CspResponse(StatusCode.BadRequest);
    }

    const selects: string = createSelects(reports.length);
    const values = reports.flatMap(mapReportBodyToInsertValues);
    this.affect(
      this.getD1Response('CSP_DB', `${INSERT_INTO} ${selects}`, values),
    );

    return new CspResponse(StatusCode.OK);
  } catch (err: unknown) {
    /**
     *   This will catch when `getRequestText()` fails and when the submitted
     * text is not a ReportBody.
     */
    const error: Error = mapToError(err);
    this.emitPublicMetric(MetricName.UnknownError);
    this.logError(error);
    this.emitPrivateMetric(MetricName.UnknownError, {
      message: mapToString(err),
    });

    return new CspResponse(StatusCode.BadRequest);
  }
}
