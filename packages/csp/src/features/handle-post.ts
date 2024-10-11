import { StatusCode } from 'cloudflare-utils';
import { Permission } from '../constants/permission.js';
import {
  SELECT_PERMISSION_FROM_KEYS,
  SELECT_USER_ID_FROM_PROJECTS,
} from '../constants/queries.js';
import {
  affect,
  getD1Database,
  getRequestSearchParam,
  getRequestText,
} from '../constants/worker.js';
import type { ReportBodyArray } from '../types/report-body-array.js';
import type ReportBody from '../types/report-body.js';
import mapReportBodyToArray from '../utils/map-report-body-to-array.js';
import parseReport from '../utils/parse-report.js';
import queries from '../utils/queries.js';
import query from '../utils/query.js';
import Response from '../utils/response.js';

const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';

export default async function handlePost(projectId: number): Promise<Response> {
  // Key
  const key: string | null = getRequestSearchParam('key');
  if (key === null) {
    // Log with Worker instance:
    // Console.log('Missing key');
    return new Response(StatusCode.BadRequest);
  }

  // Queries
  const db: D1Database = getD1Database('CSP_DB');
  const [[keyRow], [projectRow]] = await queries<2>(db, [
    [SELECT_PERMISSION_FROM_KEYS, key, projectId],
    [SELECT_USER_ID_FROM_PROJECTS, projectId],
  ]);

  // Project not found
  if (typeof projectRow === 'undefined') {
    // Log with Worker instance:
    // Console.log('Missing project');
    // Use({
    //   Account: AccountNumber.Quisido,
    //   Count: TWICE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });

    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = projectRow;
  if (typeof userId !== 'number') {
    // Log with Worker instance:
    // Console.log('Invalid database project row');
    // Use({
    //   Account: AccountNumber.Quisido,
    //   Count: TWICE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });

    return new Response(StatusCode.BadGateway);
  }

  // Key not found
  if (typeof keyRow === 'undefined') {
    // Log with Worker instance:
    // Console.log('Missing key');
    // Use({
    //   Account: userId,
    //   Count: TWICE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });

    return new Response(StatusCode.Forbidden);
  }

  // Bad permission
  const { permission } = keyRow;
  if (permission !== Permission.Post) {
    // Use({
    //   Account: userId,
    //   Count: TWICE,
    //   Project: projectId,
    //   Type: UsageType.D1Read,
    // });
    if (typeof permission !== 'number') {
      // Log with Worker instance:
      // Console.log('Invalid database key row');
      return new Response(StatusCode.BadGateway);
    }
    // Log with Worker instance:
    // Console.log('Wrong permission');
    return new Response(StatusCode.Forbidden);
  }

  // Use({
  //   Account: userId,
  //   Count: TWICE,
  //   Project: projectId,
  //   Type: UsageType.D1Read,
  // });

  const mapReportBodyToInsertValues = (
    body: ReportBody,
  ): [number, number, ...ReportBodyArray] => [
    projectId,
    Date.now(),
    ...mapReportBodyToArray(body),
  ];

  try {
    const reports: readonly ReportBody[] = parseReport(await getRequestText());

    // Use({
    //   Account: userId,
    //   Count: reports.length,
    //   Project: projectId,
    //   Type: UsageType.D1Write,
    // });

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

    affect(
      query(
        db,
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
        ...reports.flatMap(mapReportBodyToInsertValues),
      ),
    );

    return new Response(StatusCode.OK);
  } catch (err: unknown) {
    // Log with Worker instance:
    // Console.error('Invalid report', err);
    return new Response(StatusCode.BadRequest);
  }
}
