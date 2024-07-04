import { AccountNumber, UsageType } from '@quisido/workers-shared';
import { Permission } from '../constants/permission.js';
import {
  SELECT_PERMISSION_FROM_KEYS,
  SELECT_USER_ID_FROM_PROJECTS,
} from '../constants/queries.js';
import { StatusCode } from '../constants/status-code.js';
import type { ReportBodyArray } from '../types/report-body-array.js';
import type ReportBody from '../types/report-body.js';
import createAnalyticsEngineDataPoint from '../utils/create-analytics-engine-datapoint.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import mapReportBodyToArray from '../utils/map-report-body-to-array.js';
import mapReportBodyToValues from '../utils/map-report-body-to-values.js';
import parseReport from '../utils/parse-report.js';
import queries from '../utils/queries.js';
import query from '../utils/query.js';
import Response from '../utils/response.js';

interface Options {
  readonly body: ReadableStream | null;
  readonly console: Console;
  readonly ctx: ExecutionContext;
  readonly db: D1Database;
  readonly key: string | null;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

const SECONDS_PER_MONTH = 2678400;
const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
const TWICE = 2;

export default async function handlePost({
  body,
  console,
  ctx,
  db,
  key,
  projectId,
  usage,
}: Options): Promise<Response> {
  // Body
  if (body === null) {
    console.log('Invalid body');
    return new Response(StatusCode.BadRequest);
  }

  // Key
  if (key === null) {
    console.log('Missing key');
    return new Response(StatusCode.BadRequest);
  }

  // Queries
  const [[keyRow], [projectRow]] = await queries<2>(db, [
    [SELECT_PERMISSION_FROM_KEYS, key, projectId],
    [SELECT_USER_ID_FROM_PROJECTS, projectId],
  ]);

  // Project not found
  if (typeof projectRow === 'undefined') {
    console.log('Missing project');
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: AccountNumber.Quisido,
        count: TWICE,
        projectId,
        usageType: UsageType.D1Read,
      }),
    );

    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = projectRow;
  if (typeof userId !== 'number') {
    console.log('Invalid database project row');
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: AccountNumber.Quisido,
        count: TWICE,
        projectId,
        usageType: UsageType.D1Read,
      }),
    );

    return new Response(StatusCode.BadGateway);
  }

  // Key not found
  if (typeof keyRow === 'undefined') {
    console.log('Missing key');
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: userId,
        count: TWICE,
        projectId,
        usageType: UsageType.D1Read,
      }),
    );

    return new Response(StatusCode.Forbidden);
  }

  // Bad permission
  const { permission } = keyRow;
  if (permission !== Permission.Post) {
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: userId,
        count: TWICE,
        projectId,
        usageType: UsageType.D1Read,
      }),
    );
    if (typeof permission !== 'number') {
      console.log('Invalid database key row');
      return new Response(StatusCode.BadGateway);
    }
    console.log('Wrong permission');
    return new Response(StatusCode.Forbidden);
  }

  usage.writeDataPoint(
    createAnalyticsEngineDataPoint({
      accountNumber: userId,
      count: TWICE,
      projectId,
      usageType: UsageType.D1Read,
    }),
  );

  const mapReportBodyToInsertValues = (
    body: ReportBody,
  ): [number, number, ...ReportBodyArray] => [
    projectId,
    Date.now(),
    ...mapReportBodyToArray(body),
  ];

  try {
    const reportStr: string = await mapReadableStreamToString(body);
    const reports: readonly ReportBody[] = parseReport(reportStr);

    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: userId,
        count: reports.length,
        projectId,
        usageType: UsageType.D1Write,
      }),
    );

    // There has to be a more accurate way to predict the row size.
    const rowSize: number = reports
      .flatMap(mapReportBodyToValues)
      .join('').length;
    usage.writeDataPoint(
      createAnalyticsEngineDataPoint({
        accountNumber: userId,
        count: rowSize,
        /**
         *   So as not to double-charge, maybe this should be until end-of-day or
         * end-of-month and let cron take over from there?
         */
        per: SECONDS_PER_MONTH,
        projectId,
        usageType: UsageType.D1Store,
      }),
    );

    ctx.waitUntil(
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
    console.error('Invalid report', err);
    return new Response(StatusCode.BadRequest);
  }
}
