import { isNumber, isObject } from 'fmrs';
import type DashboardApiResponse from '../types/dashboard-api-response.js';

const DOUBLE = 2;
const QUADRUPLE = 4;

const isNumberArray = (value: unknown): value is readonly number[] =>
  Array.isArray(value) && value.every(isNumber);

const isNumberDouble = (value: unknown): value is readonly [number, number] =>
  isNumberArray(value) && value.length === DOUBLE;

const isNumberQuadruple = (
  value: unknown,
): value is readonly [number, number, number, number] =>
  isNumberArray(value) && value.length === QUADRUPLE;

export default function isDashboardApiResponse(
  value: unknown,
): value is DashboardApiResponse {
  if (!isObject(value)) {
    return false;
  }

  return (
    'cls' in value &&
    isNumberDouble(value.cls) &&
    'dcl' in value &&
    isNumberDouble(value.dcl) &&
    'domComplete' in value &&
    isNumberDouble(value.domComplete) &&
    'errorCounts' in value &&
    isObject(value.errorCounts) &&
    'P50' in value.errorCounts &&
    isNumberQuadruple(value.errorCounts.P50) &&
    'P75' in value.errorCounts &&
    isNumberQuadruple(value.errorCounts.P75) &&
    'P90' in value.errorCounts &&
    isNumberQuadruple(value.errorCounts.P90) &&
    'fcp' in value &&
    isNumberDouble(value.fcp) &&
    'fip' in value &&
    isNumberDouble(value.fip) &&
    'inp' in value &&
    isNumberDouble(value.inp) &&
    'lcp' in value &&
    isNumberDouble(value.lcp) &&
    'loadEvent' in value &&
    isNumberDouble(value.loadEvent) &&
    'loadingTime' in value &&
    isNumberDouble(value.loadingTime) &&
    'sessionTimeSpent' in value &&
    isNumber(value.sessionTimeSpent) &&
    'ttfb' in value &&
    isNumberDouble(value.ttfb) &&
    'viewTimeSpent' in value &&
    isNumber(value.viewTimeSpent)
  );
}
