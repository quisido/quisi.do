import { isObject } from 'fmrs';
import type DashboardApiResponse from '../types/dashboard-api-response.js';

export default function isDashboardApiResponse(
  value: unknown,
): value is DashboardApiResponse {
  if (!isObject(value)) {
    return false;
  }

  return (
    'cls' in value &&
    typeof value.cls === 'number' &&
    'fcp' in value &&
    typeof value.fcp === 'number' &&
    'inp' in value &&
    typeof value.inp === 'number' &&
    'lcp' in value &&
    typeof value.lcp === 'number' &&
    'lt' in value &&
    typeof value.lt === 'number'
  );
}
