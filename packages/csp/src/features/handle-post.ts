import { SELECT_USER_ID_FROM_PROJECTS } from "../constants/queries.js";
import { StatusCode } from "../constants/status-code.js";
import type ReportBody from "../types/report-body.js";
import mapReadableStreamToString from "../utils/map-readable-stream-to-string.js";
import parseReport from "../utils/parse-report.js";
import query from "../utils/query.js";
import Response from '../utils/response.js';

interface Options {
  readonly body: ReadableStream | null;
  readonly console: Console;
  readonly ctx: ExecutionContext;
  readonly db: D1Database;
  readonly projectId: number;
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
  number | null
];

const SELECT = 'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';

const mapReportBodyToArray = ({
  documentURL,
  referrer,
  blockedURL,
  effectiveDirective,
  originalPolicy,
  sourceFile,
  sample,
  disposition,
  statusCode,
  lineNumber,
  columnNumber,
}: ReportBody): ReportBodyArray => [
  documentURL,
  referrer ?? null,
  blockedURL ?? null,
  effectiveDirective,
  originalPolicy,
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
}: Options): Promise<Response> {
  if (body === null) {
    console.log('Invalid body');
    return new Response(StatusCode.BadRequest);
  }

  // Query
  const [result] =
    await query(db, SELECT_USER_ID_FROM_PROJECTS, projectId);

  // Not found
  if (typeof result === 'undefined') {
    /**
     * When `USAGE` is ready:
     * use({
     *   account: AccountNumber.Quisido,
     *   type: UsageType.D1Read,
     * });
     */

    console.log('Missing project');
    return new Response(StatusCode.NotFound);
  }

  // Bad gateway
  const { userId } = result;
  if (typeof userId !== 'number') {
    /**
     * When `USAGE` is ready:
     * use({
     *   account: AccountNumber.Quisido,
     *   type: UsageType.D1Read,
     * });
     */

    console.log('Invalid database table row');
    return new Response(StatusCode.BadGateway);
  }

  /**
   * When `USAGE` is ready:
   * use({
   *   account: userId,
   *   type: UsageType.D1Read,
   * });
   */

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

    /**
     * When `USAGE` is ready:
     * use({
     *   account: userId,
     *   type: UsageType.D1Write,
     * });
     */

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
