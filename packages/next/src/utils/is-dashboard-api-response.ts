import { isNumber, isObject } from 'fmrs';
import type DashboardApiResponse from '../types/dashboard-api-response.js';

const PERCENTILE_COUNT = 2;

const isPercentiles = (value: unknown): value is readonly [number, number] =>
  Array.isArray(value) &&
  value.length === PERCENTILE_COUNT &&
  value.every(isNumber);

export default function isDashboardApiResponse(
  value: unknown,
): value is DashboardApiResponse {
  if (!isObject(value)) {
    return false;
  }

  return (
    'cls' in value &&
    isPercentiles(value.cls) &&
    'fcp' in value &&
    isPercentiles(value.fcp) &&
    'inp' in value &&
    isPercentiles(value.inp) &&
    'lcp' in value &&
    isPercentiles(value.lcp) &&
    'loadingTime' in value &&
    isPercentiles(value.loadingTime)
  );
}
