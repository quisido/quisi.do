import type { ReportBodyArray } from '../types/report-body-array.js';
import type ReportBody from '../types/report-body.js';

export default function mapReportBodyToArray({
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
}: ReportBody): ReportBodyArray {
  return [
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
}
