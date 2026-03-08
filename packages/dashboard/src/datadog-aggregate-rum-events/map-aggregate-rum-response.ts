import type { RUMAnalyticsAggregateResponse } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import mapToOptionalNumber from '../utils/map-to-optional-number.js';
import mapToOptionalTimeSeries from './map-to-optional-time-series.js';
import sanitizeStatus from './sanitize-status.js';

const DEFAULT_ELAPSED = 0;

function extractComputes(response: RUMAnalyticsAggregateResponse) {
  return response.data?.buckets?.[0]?.computes;
}

export default function mapAggregateRumResponse(
  sessionAndLayoutResponse: RUMAnalyticsAggregateResponse,
  performanceTimingResponse: RUMAnalyticsAggregateResponse,
  loadTimingResponse: RUMAnalyticsAggregateResponse,
  errorCountResponse: RUMAnalyticsAggregateResponse,
) {
  const sessionAndLayout = extractComputes(sessionAndLayoutResponse);
  const performanceTiming = extractComputes(performanceTimingResponse);
  const loadTiming = extractComputes(loadTimingResponse);
  const errorCount = extractComputes(errorCountResponse);
  const meta = sessionAndLayoutResponse.meta;

  return {
    cumulativeLayoutShiftP50: mapToOptionalNumber(sessionAndLayout?.['c1']),
    cumulativeLayoutShiftP75: mapToOptionalNumber(sessionAndLayout?.['c2']),
    domCompleteP50: mapToOptionalNumber(sessionAndLayout?.['c3']),
    domCompleteP75: mapToOptionalNumber(sessionAndLayout?.['c4']),
    domContentLoadedP50: mapToOptionalNumber(sessionAndLayout?.['c5']),
    domContentLoadedP75: mapToOptionalNumber(sessionAndLayout?.['c6']),
    elapsed: meta?.elapsed ?? DEFAULT_ELAPSED,
    errorCountP50: mapToOptionalTimeSeries(errorCount?.['c0']),
    errorCountP75: mapToOptionalTimeSeries(errorCount?.['c1']),
    errorCountP90: mapToOptionalTimeSeries(errorCount?.['c2']),
    firstByteP50: mapToOptionalNumber(performanceTiming?.['c0']),
    firstByteP75: mapToOptionalNumber(performanceTiming?.['c1']),
    firstContentfulPaintP50: mapToOptionalNumber(performanceTiming?.['c2']),
    firstContentfulPaintP75: mapToOptionalNumber(performanceTiming?.['c3']),
    firstInputDelayP50: mapToOptionalNumber(performanceTiming?.['c4']),
    firstInputDelayP75: mapToOptionalNumber(performanceTiming?.['c5']),
    interactionToNextPaintP50: mapToOptionalNumber(performanceTiming?.['c6']),
    interactionToNextPaintP75: mapToOptionalNumber(performanceTiming?.['c7']),
    largestContentfulPaintP50: mapToOptionalNumber(performanceTiming?.['c8']),
    largestContentfulPaintP75: mapToOptionalNumber(performanceTiming?.['c9']),
    loadEventP50: mapToOptionalNumber(loadTiming?.['c0']),
    loadEventP75: mapToOptionalNumber(loadTiming?.['c1']),
    loadingTimeP50: mapToOptionalNumber(loadTiming?.['c2']),
    loadingTimeP75: mapToOptionalNumber(loadTiming?.['c3']),
    requestId: meta?.requestId ?? '',
    sessionTimeSpent: mapToOptionalNumber(sessionAndLayout?.['c0']),
    status: sanitizeStatus(meta?.status),
    viewTimeSpent: mapToOptionalNumber(loadTiming?.['c4']),
    warnings: meta?.warnings ?? [],
  };
}
