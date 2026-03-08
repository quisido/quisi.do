import type { RUMAnalyticsAggregateResponse } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import mapToOptionalNumber from '../utils/map-to-optional-number.js';
import mapToOptionalTimeSeries from './map-to-optional-time-series.js';
import sanitizeStatus from './sanitize-status.js';

const DEFAULT_ELAPSED = 0;

interface AggregateResponses {
  readonly errorCountResponse: RUMAnalyticsAggregateResponse;
  readonly loadTimingResponse: RUMAnalyticsAggregateResponse;
  readonly performanceTimingResponse: RUMAnalyticsAggregateResponse;
  readonly sessionAndLayoutResponse: RUMAnalyticsAggregateResponse;
}

const extractComputes = (
  response: RUMAnalyticsAggregateResponse,
): Record<string, unknown> => response.data?.buckets?.[0]?.computes ?? {};

const mapSessionAndLayout = (
  computes: Record<string, unknown>,
): Record<string, number | undefined> => ({
  cumulativeLayoutShiftP50: mapToOptionalNumber(computes['c1']),
  cumulativeLayoutShiftP75: mapToOptionalNumber(computes['c2']),
  domCompleteP50: mapToOptionalNumber(computes['c3']),
  domCompleteP75: mapToOptionalNumber(computes['c4']),
  domContentLoadedP50: mapToOptionalNumber(computes['c5']),
  domContentLoadedP75: mapToOptionalNumber(computes['c6']),
  sessionTimeSpent: mapToOptionalNumber(computes['c0']),
});

const mapPerformanceTiming = (
  computes: Record<string, unknown>,
): Record<string, number | undefined> => ({
  firstByteP50: mapToOptionalNumber(computes['c0']),
  firstByteP75: mapToOptionalNumber(computes['c1']),
  firstContentfulPaintP50: mapToOptionalNumber(computes['c2']),
  firstContentfulPaintP75: mapToOptionalNumber(computes['c3']),
  firstInputDelayP50: mapToOptionalNumber(computes['c4']),
  firstInputDelayP75: mapToOptionalNumber(computes['c5']),
  interactionToNextPaintP50: mapToOptionalNumber(computes['c6']),
  interactionToNextPaintP75: mapToOptionalNumber(computes['c7']),
  largestContentfulPaintP50: mapToOptionalNumber(computes['c8']),
  largestContentfulPaintP75: mapToOptionalNumber(computes['c9']),
});

const mapLoadTiming = (
  computes: Record<string, unknown>,
): Record<string, number | undefined> => ({
  loadEventP50: mapToOptionalNumber(computes['c0']),
  loadEventP75: mapToOptionalNumber(computes['c1']),
  loadingTimeP50: mapToOptionalNumber(computes['c2']),
  loadingTimeP75: mapToOptionalNumber(computes['c3']),
  viewTimeSpent: mapToOptionalNumber(computes['c4']),
});

const mapErrorCount = (
  computes: Record<string, unknown>,
): Record<string, readonly number[] | undefined> => ({
  errorCountP50: mapToOptionalTimeSeries(computes['c0']),
  errorCountP75: mapToOptionalTimeSeries(computes['c1']),
  errorCountP90: mapToOptionalTimeSeries(computes['c2']),
});

const mapAggregateRumResponse = ({
  errorCountResponse,
  loadTimingResponse,
  performanceTimingResponse,
  sessionAndLayoutResponse,
}: AggregateResponses) => {
  const meta = sessionAndLayoutResponse.meta;
  return {
    ...mapSessionAndLayout(extractComputes(sessionAndLayoutResponse)),
    ...mapPerformanceTiming(extractComputes(performanceTimingResponse)),
    ...mapLoadTiming(extractComputes(loadTimingResponse)),
    ...mapErrorCount(extractComputes(errorCountResponse)),
    elapsed: meta?.elapsed ?? DEFAULT_ELAPSED,
    requestId: meta?.requestId ?? '',
    status: sanitizeStatus(meta?.status),
    warnings: meta?.warnings ?? [],
  };
};

export default mapAggregateRumResponse;
