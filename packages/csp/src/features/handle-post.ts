import { AccountNumber, Product, UsageType } from '@quisido/workers-shared';
import { SELECT_USER_ID_FROM_PROJECTS } from '../constants/queries.js';
import { StatusCode } from '../constants/status-code.js';
import type ReportBody from '../types/report-body.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import parseReport from '../utils/parse-report.js';
import query from '../utils/query.js';
import Response from '../utils/response.js';

interface Options {
  readonly body: ReadableStream | null;
  readonly console: Console;
  readonly ctx: ExecutionContext;
  readonly db: D1Database;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

type ReportBodyArray = [
  string,
  string | null,
  string | null,
  string,
  string,
  string | null,
  string | null,
  string,
  number,
  number | null,
  number | null,
];

const DEFAULT_PROJECT_ID = 0;
const ONCE = 1;
const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
const SINGLE = 1;

const mapReportBodyToArray = ({
  blockedURL,
  columnNumber,
  disposition,
  documentURL,
  effectiveDirective,
  lineNumber,
  referrer,
  sample,
  sourceFile,
  statusCode,
}: ReportBody): ReportBodyArray => [
  documentURL,
  referrer ?? null,
  blockedURL ?? null,
  effectiveDirective,
  // "Original policy" is too large (expensive), so just write an empty string.
  '',
  sourceFile ?? null,
  sample ?? null,
  disposition,
  statusCode,
  lineNumber ?? null,
  columnNumber ?? null,
];

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

    console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = result;
  if (typeof userId !== 'number') {
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

    console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  usage.writeDataPoint({
    indexes: [userId.toString()],

    doubles: [
      Product.ContentSecurityPolicy,
      projectId,
      UsageType.D1Read,
      ONCE,
      SINGLE,
    ],
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
      indexes: [userId.toString()],

      doubles: [
        Product.ContentSecurityPolicy,
        projectId,
        UsageType.D1Write,
        ONCE,
        SINGLE,
      ],
    });

    ctx.waitUntil(
      query(
        db,
        `
        INSERT INTO \`reports\` (
          \`project\`,
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
