import { mapToError } from 'fmrs';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import DatadogRumApi from './datadog-rum-api.js';
import emitMissingMetrics from './emit-missing-metrics.js';
import logWarnings from './log-warnings.js';
import {
  sanitizeCls,
  sanitizeFcp,
  sanitizeInp,
  sanitizeLcp,
  sanitizeLoadingTime,
} from './sanitize.js';

interface DatadogAggregateRumEvents {
  readonly cumulativeLayoutShiftP50?: number | undefined;
  readonly cumulativeLayoutShiftP75?: number | undefined;
  readonly firstContentfulPaintP50?: number | undefined;
  readonly firstContentfulPaintP75?: number | undefined;
  readonly interactionToNextPaintP50?: number | undefined;
  readonly interactionToNextPaintP75?: number | undefined;
  readonly largestContentfulPaintP50?: number | undefined;
  readonly largestContentfulPaintP75?: number | undefined;
  readonly loadingTimeP50?: number | undefined;
  readonly loadingTimeP75?: number | undefined;
}

export default async function getDatadogAggregateRumEvents(
  this: DashboardFetchHandler,
): Promise<DatadogAggregateRumEvents> {
  const datadog = new DatadogRumApi({
    apiKey: this.datadogApiKey,
    fetch: this.fetch.bind(this),
    rumReadApplicationKey: this.datadogRumReadApplicationKey,
  });

  try {
    const {
      cumulativeLayoutShiftP50,
      cumulativeLayoutShiftP75,
      elapsed,
      firstContentfulPaintP50,
      firstContentfulPaintP75,
      interactionToNextPaintP50,
      interactionToNextPaintP75,
      largestContentfulPaintP50,
      largestContentfulPaintP75,
      loadingTimeP50,
      loadingTimeP75,
      requestId,
      status,
      warnings,
    } = await datadog.getAggregateRumEvents();
    logWarnings.call(this, warnings);
    emitMissingMetrics.call(
      this,
      {
        cumulativeLayoutShiftP50,
        cumulativeLayoutShiftP75,
        firstContentfulPaintP50,
        firstContentfulPaintP75,
        interactionToNextPaintP50,
        interactionToNextPaintP75,
        largestContentfulPaintP50,
        largestContentfulPaintP75,
        loadingTimeP50,
        loadingTimeP75,
      },
      {
        elapsed,
        requestId,
        status,
      },
    );

    return {
      cumulativeLayoutShiftP50: sanitizeCls(cumulativeLayoutShiftP50),
      cumulativeLayoutShiftP75: sanitizeCls(cumulativeLayoutShiftP75),
      firstContentfulPaintP50: sanitizeFcp(firstContentfulPaintP50),
      firstContentfulPaintP75: sanitizeFcp(firstContentfulPaintP75),
      interactionToNextPaintP50: sanitizeInp(interactionToNextPaintP50),
      interactionToNextPaintP75: sanitizeInp(interactionToNextPaintP75),
      largestContentfulPaintP50: sanitizeLcp(largestContentfulPaintP50),
      largestContentfulPaintP75: sanitizeLcp(largestContentfulPaintP75),
      loadingTimeP50: sanitizeLoadingTime(loadingTimeP50),
      loadingTimeP75: sanitizeLoadingTime(loadingTimeP75),
    };
  } catch (err: unknown) {
    const error: Error = mapToError(err);
    this.logError(error);
    return {};
  }
}
