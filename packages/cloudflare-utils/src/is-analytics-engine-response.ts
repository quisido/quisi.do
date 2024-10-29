import type AnalyticsEngineResponse from './analytics-engine-response.js';
import isAnalyticsEngineRow from './is-analytics-engine-row.js';

export default function isAnalyticsEngineResponse(
  value: unknown,
): value is AnalyticsEngineResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    Array.isArray(value.data) &&
    value.data.every(isAnalyticsEngineRow) &&
    'meta' in value &&
    Array.isArray(value.meta)
  );
}
