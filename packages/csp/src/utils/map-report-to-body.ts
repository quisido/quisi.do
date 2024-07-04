import type ReportBody from '../types/report-body.js';

/**
 *   We use `Required` in the return type to ensure that new properties on the
 * `ReportBody` type get added to the runtime code.
 */

export default function mapReportToBody({
  body: {
    blockedURL,
    columnNumber,
    disposition,
    documentURL,
    effectiveDirective,
    lineNumber,
    originalPolicy,
    referrer,
    sample,
    sourceFile,
    statusCode,
  },
}: Record<'body', ReportBody>): Required<ReportBody> {
  return {
    blockedURL,
    columnNumber,
    disposition,
    documentURL,
    effectiveDirective,
    lineNumber,
    originalPolicy,
    referrer,
    sample,
    sourceFile,
    statusCode,
  };
}
