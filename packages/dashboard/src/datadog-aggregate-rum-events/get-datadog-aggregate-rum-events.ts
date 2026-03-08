import { mapToError } from 'fmrs';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import checkRumEventsCache from './check-rum-events-cache.js';
import type { DatadogAggregateRumEvents } from './datadog-aggregate-rum-events.js';
import DatadogRumApi from './datadog-rum-api.js';
import storeRumEventsCache from './store-rum-events-cache.js';
import transformRumEvents from './transform-rum-events.js';

export default async function getDatadogAggregateRumEvents(
  this: DashboardFetchHandler,
): Promise<DatadogAggregateRumEvents> {
  const cache: R2Bucket = this.getR2Bucket('CACHE');
  const cached = await checkRumEventsCache.call(this, cache);
  if (cached !== undefined) {
    return cached;
  }

  const datadog = new DatadogRumApi({
    apiKey: this.datadogApiKey,
    fetch: this.fetch.bind(this),
    rumReadApplicationKey: this.datadogRumReadApplicationKey,
  });

  try {
    const result = await datadog.getAggregateRumEvents(
      this.datadogApplicationId,
    );
    const value = transformRumEvents.call(this, result);
    storeRumEventsCache.call(this, cache, value);
    return value;
  } catch (err: unknown) {
    const error: Error = mapToError(err);
    this.logError(error);
    return {};
  }
}
