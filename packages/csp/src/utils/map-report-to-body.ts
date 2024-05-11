import type ReportBody from "../types/report.js";

export default function mapReportToBody({
  body,
}: Record<'body', ReportBody>): ReportBody {
  return body;
}
