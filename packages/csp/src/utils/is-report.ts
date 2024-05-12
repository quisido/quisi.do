import type ReportBody from "../types/report-body.js";
import isReportBody from "./is-report-body.js";

export default function isReport(value: unknown): value is Record<'body', ReportBody> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'body' in value &&
    isReportBody(value.body)
  );
}
