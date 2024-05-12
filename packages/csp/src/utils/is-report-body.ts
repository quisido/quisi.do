import type ReportBody from "../types/report-body.js";
import isNumber from "./is-number.js";
import isString from "./is-string.js";
import optional from "./optional.js";

export default function isReportBody(value: unknown): value is ReportBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    optional(value, 'blockedURL', isString) &&
    optional(value, 'columnNumber', isNumber) &&
    'disposition' in value &&
    typeof value.disposition === 'string' &&
    'documentURL' in value &&
    typeof value.documentURL === 'string' &&
    'effectiveDirective' in value &&
    typeof value.effectiveDirective === 'string' &&
    optional(value, 'lineNumber', isNumber) &&
    'originalPolicy' in value &&
    typeof value.originalPolicy === 'string' &&
    optional(value, 'referrer', isString) &&
    optional(value, 'sample', isString) &&
    optional(value, 'sourceFile', isString) &&
    'statusCode' in value &&
    typeof value.statusCode === 'number'
  );
}
