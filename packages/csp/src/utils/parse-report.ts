import type ReportBody from '../types/report-body.js';
import isReport from './is-report.js';
import mapReportToBody from './map-report-to-body.js';

export default function parseReport(report: string): readonly ReportBody[] {
  const json: unknown = JSON.parse(report);

  if (!Array.isArray(json)) {
    throw new Error('Expected an ARRAY of reports.', {
      cause: report,
    });
  }

  if (!json.every(isReport)) {
    throw new Error('Expected an array of REPORTS.', {
      cause: report,
    });
  }

  return json.map(mapReportToBody);
}
