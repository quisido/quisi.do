import { mapToError } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import DatadogRumApi from './datadog-rum-api.js';
import logWarnings from './log-warnings.js';

interface DatadogAggregateRumEvents {
  readonly cumulativeLayoutShift?: number | undefined;
  readonly firstContentfulPaint?: number | undefined;
  readonly interactionToNextPaint?: number | undefined;
  readonly largestContentfulPaint?: number | undefined;
  readonly loadingTime?: number | undefined;
}

const BASE = 10;
const CUMULATIVE_LAYOUT_SHIFT_DECIMALS = 4;
const NANOSECONDS_PER_MILLISECOND = 1_000_000;

export default async function getDatadogAggregateRumEvents(
  this: DashboardFetchHandler,
): Promise<DatadogAggregateRumEvents> {
  const datadog = new DatadogRumApi({
    apiKey: this.datadogApiKey,
    fetch: this.fetch.bind(this),
    rumReadApplicationKey: this.datadogRumReadApplicationKey,
  });

  try {
    const { elapsed, requestId, status, warnings } =
      await datadog.getAggregateRumEvents();
    logWarnings.call(this, warnings);

    if (
      typeof cls !== 'number' ||
      typeof fcp !== 'number' ||
      typeof inp !== 'number' ||
      typeof lcp !== 'number' ||
      typeof lt !== 'number'
    ) {
      this.emitPublicMetric(MetricName.InvalidDatadogRumResponse, {
        elapsed,
        requestId,
        status,
      });

      this.logError(
        new Error(`Invalid Datadog RUM response: ${JSON.stringify(data)}`),
      );

      return {};
    }

    return {
      firstContentfulPaint: Math.round(fcp / NANOSECONDS_PER_MILLISECOND),
      interactionToNextPaint: Math.round(inp / NANOSECONDS_PER_MILLISECOND),
      largestContentfulPaint: Math.round(lcp / NANOSECONDS_PER_MILLISECOND),
      loadingTime: Math.round(lt / NANOSECONDS_PER_MILLISECOND),

      cumulativeLayoutShift:
        Math.round(cls * BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS) /
        BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS,
    };
  } catch (err: unknown) {
    const error: Error = mapToError(err);
    this.logError(error);
    return {};
  }
}
