import { StatusCode } from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import { Permission } from '../constants/permission.js';
import {
  SELECT_PERMISSION_FROM_KEYS,
  SELECT_USER_ID_FROM_PROJECTS,
} from '../constants/queries.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import type { ReportBodyArray } from '../types/report-body-array.js';
import type ReportBody from '../types/report-body.js';
import mapReportBodyToArray from '../utils/map-report-body-to-array.js';
import parseReport from '../utils/parse-report.js';
import Response from '../utils/response.js';

const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';

export default async function handlePost(
  this: CspFetchHandler,
  projectId: number,
): Promise<Response> {
  // Key
  const key: string | null = this.getRequestSearchParam('key');
  if (key === null) {
    this.console.log('Missing key');
    return new Response(StatusCode.BadRequest);
  }

  // Queries
  const [[keyRow], [projectRow]] = await this.queries<2>('CSP_DB', [
    [SELECT_PERMISSION_FROM_KEYS, key, projectId],
    [SELECT_USER_ID_FROM_PROJECTS, projectId],
  ]);

  // Project not found
  if (typeof projectRow === 'undefined') {
    this.console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = projectRow;
  if (typeof userId !== 'number') {
    this.console.log('Invalid database project row');
    return new Response(StatusCode.BadGateway);
  }

  // Key not found
  if (typeof keyRow === 'undefined') {
    this.console.log('Missing key');
    return new Response(StatusCode.Forbidden);
  }

  // Bad permission
  const { permission } = keyRow;
  if (permission !== Permission.Post) {
    if (typeof permission !== 'number') {
      this.console.log('Invalid database key row');
      return new Response(StatusCode.BadGateway);
    }
    this.console.log('Wrong permission');
    return new Response(StatusCode.Forbidden);
  }

  const mapReportBodyToInsertValues = (
    body: ReportBody,
  ): [number, number, ...ReportBodyArray] => [
    projectId,
    Date.now(),
    ...mapReportBodyToArray(body),
  ];

  try {
    const reports: readonly ReportBody[] = parseReport(
      await this.request.text(),
    );

    // There has to be a more accurate way to predict the row size.
    // Const rowSize: number = reports
    //   .flatMap(mapReportBodyToValues)
    //   .join('').length;
    // Use({
    //   Account: userId,
    //   Count: rowSize,
    //   /**
    //    *   So as not to double-charge, maybe this should be until end-of-day or
    //    * End-of-month and let cron take over from there?
    //    */
    //   Per: SECONDS_PER_MONTH,
    //   Project: projectId,
    //   Type: UsageType.D1Store,
    // });

    this.affect(
      this.getD1Response(
        'CSP_DB',
        `
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
        ${new Array(reports.length).fill(SELECT).join(' UNION ALL ')}
        `,
        reports.flatMap(mapReportBodyToInsertValues),
      ),
    );

    return new Response(StatusCode.OK);
  } catch (err: unknown) {
    this.logError(mapToError(err));
    return new Response(StatusCode.BadRequest);
  }
}
