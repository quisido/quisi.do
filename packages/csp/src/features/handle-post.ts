import { SELECT_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import { StatusCode } from '../constants/status-code.js';
import type ReportBody from '../types/report-body.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import parseReport from '../utils/parse-report.js';
import query from '../utils/query.js';
import Response from '../utils/response.js';
import mapProjectIdToD1ReadDoubles from '../utils/map-project-id-to-d1-read-doubles.js';
import type { ReportBodyArray } from '../types/report-body-array.js';
import mapReportBodyToArray from '../utils/map-report-body-to-array.js';
import mapProjectIdToD1WriteDoubles from '../utils/map-project-id-to-d1-write-doubles.js';
import { DEFAULT_D1_READ_DATA_POINT } from '../constants/default-d1-read-data-point.js';

interface Options {
  readonly body: ReadableStream | null;
  readonly console: Console;
  readonly ctx: ExecutionContext;
  readonly db: D1Database;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';

export default async function handlePost({
  body,
  console,
  ctx,
  db,
  projectId,
  usage,
}: Options): Promise<Response> {
  if (body === null) {
    console.log('Invalid body');
    return new Response(StatusCode.BadRequest);
  }

  // Query
  const [result] = await query(db, SELECT_USER_ID_FROM_PROJECTS, projectId);

  // Not found
  if (typeof result === 'undefined') {
    usage.writeDataPoint(DEFAULT_D1_READ_DATA_POINT);
    console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = result;
  if (typeof userId !== 'number') {
    usage.writeDataPoint(DEFAULT_D1_READ_DATA_POINT);
    console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  usage.writeDataPoint({
    doubles: mapProjectIdToD1ReadDoubles(projectId),
    indexes: [userId.toString()],
  });

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

    usage.writeDataPoint({
      doubles: mapProjectIdToD1WriteDoubles(projectId),
      indexes: [userId.toString()],
    });

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
