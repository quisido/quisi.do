import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import type { DatadogAggregateRumEvents } from './datadog-aggregate-rum-events.js';
import emitMissingMetrics from './emit-missing-metrics.js';
import logWarnings from './log-warnings.js';
import mapNsToMs from './map-ns-to-ms.js';
import round from './round.js';

const CUMULATIVE_LAYOUT_SHIFT_DECIMALS = 4;

const roundCls = (value: number | undefined): number | undefined =>
  round(value, CUMULATIVE_LAYOUT_SHIFT_DECIMALS);

interface AggregateRumEventsResult {
  readonly cumulativeLayoutShiftP50?: number | undefined;
  readonly cumulativeLayoutShiftP75?: number | undefined;
  readonly domCompleteP50?: number | undefined;
  readonly domCompleteP75?: number | undefined;
  readonly domContentLoadedP50?: number | undefined;
  readonly domContentLoadedP75?: number | undefined;
  readonly elapsed: number;
  readonly errorCountP50?: readonly number[] | undefined;
  readonly errorCountP75?: readonly number[] | undefined;
  readonly errorCountP90?: readonly number[] | undefined;
  readonly firstByteP50?: number | undefined;
  readonly firstByteP75?: number | undefined;
  readonly firstContentfulPaintP50?: number | undefined;
  readonly firstContentfulPaintP75?: number | undefined;
  readonly firstInputDelayP50?: number | undefined;
  readonly firstInputDelayP75?: number | undefined;
  readonly interactionToNextPaintP50?: number | undefined;
  readonly interactionToNextPaintP75?: number | undefined;
  readonly largestContentfulPaintP50?: number | undefined;
  readonly largestContentfulPaintP75?: number | undefined;
  readonly loadEventP50?: number | undefined;
  readonly loadEventP75?: number | undefined;
  readonly loadingTimeP50?: number | undefined;
  readonly loadingTimeP75?: number | undefined;
  readonly requestId: string;
  readonly sessionTimeSpent?: number | undefined;
  readonly status: string;
  readonly viewTimeSpent?: number | undefined;
  readonly warnings: readonly unknown[];
}

const transformRumEvents = function transformRumEvents(
  this: DashboardFetchHandler,
  result: AggregateRumEventsResult,
): DatadogAggregateRumEvents {
  logWarnings.call(this, result.warnings);
  emitMissingMetrics.call(
    this,
    {
      cumulativeLayoutShiftP50: result.cumulativeLayoutShiftP50,
      cumulativeLayoutShiftP75: result.cumulativeLayoutShiftP75,
      domCompleteP50: result.domCompleteP50,
      domCompleteP75: result.domCompleteP75,
      domContentLoadedP50: result.domContentLoadedP50,
      domContentLoadedP75: result.domContentLoadedP75,
      errorCountP50: result.errorCountP50,
      errorCountP75: result.errorCountP75,
      errorCountP90: result.errorCountP90,
      firstByteP50: result.firstByteP50,
      firstByteP75: result.firstByteP75,
      firstContentfulPaintP50: result.firstContentfulPaintP50,
      firstContentfulPaintP75: result.firstContentfulPaintP75,
      firstInputDelayP50: result.firstInputDelayP50,
      firstInputDelayP75: result.firstInputDelayP75,
      interactionToNextPaintP50: result.interactionToNextPaintP50,
      interactionToNextPaintP75: result.interactionToNextPaintP75,
      largestContentfulPaintP50: result.largestContentfulPaintP50,
      largestContentfulPaintP75: result.largestContentfulPaintP75,
      loadEventP50: result.loadEventP50,
      loadEventP75: result.loadEventP75,
      loadingTimeP50: result.loadingTimeP50,
      loadingTimeP75: result.loadingTimeP75,
      sessionTimeSpent: result.sessionTimeSpent,
      viewTimeSpent: result.viewTimeSpent,
    },
    {
      elapsed: result.elapsed,
      requestId: result.requestId,
      status: result.status,
    },
  );

  return {
    cumulativeLayoutShiftP50: roundCls(result.cumulativeLayoutShiftP50),
    cumulativeLayoutShiftP75: roundCls(result.cumulativeLayoutShiftP75),
    domCompleteP50: mapNsToMs(result.domCompleteP50),
    domCompleteP75: mapNsToMs(result.domCompleteP75),
    domContentLoadedP50: mapNsToMs(result.domContentLoadedP50),
    domContentLoadedP75: mapNsToMs(result.domContentLoadedP75),
    errorCountP50: result.errorCountP50,
    errorCountP75: result.errorCountP75,
    errorCountP90: result.errorCountP90,
    firstByteP50: mapNsToMs(result.firstByteP50),
    firstByteP75: mapNsToMs(result.firstByteP75),
    firstContentfulPaintP50: mapNsToMs(result.firstContentfulPaintP50),
    firstContentfulPaintP75: mapNsToMs(result.firstContentfulPaintP75),
    firstInputDelayP50: mapNsToMs(result.firstInputDelayP50),
    firstInputDelayP75: mapNsToMs(result.firstInputDelayP75),
    interactionToNextPaintP50: mapNsToMs(result.interactionToNextPaintP50),
    interactionToNextPaintP75: mapNsToMs(result.interactionToNextPaintP75),
    largestContentfulPaintP50: mapNsToMs(result.largestContentfulPaintP50),
    largestContentfulPaintP75: mapNsToMs(result.largestContentfulPaintP75),
    loadEventP50: mapNsToMs(result.loadEventP50),
    loadEventP75: mapNsToMs(result.loadEventP75),
    loadingTimeP50: mapNsToMs(result.loadingTimeP50),
    loadingTimeP75: mapNsToMs(result.loadingTimeP75),
    sessionTimeSpent: mapNsToMs(result.sessionTimeSpent),
    viewTimeSpent: mapNsToMs(result.viewTimeSpent),
  };
};

export default transformRumEvents;
