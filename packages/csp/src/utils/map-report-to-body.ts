import type ReportBody from '../types/report-body.js';

export default function mapReportToBody({
  body,
}: Record<'body', ReportBody>): ReportBody {
  return body;
}
