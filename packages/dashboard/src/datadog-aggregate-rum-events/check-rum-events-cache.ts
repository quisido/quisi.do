import { MetricName } from '../constants/metric-name.js';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import type { DatadogAggregateRumEvents } from './datadog-aggregate-rum-events.js';

const checkRumEventsCache = async function checkRumEventsCache(
  this: DashboardFetchHandler,
  cache: R2Bucket,
): Promise<DatadogAggregateRumEvents | undefined> {
  const cacheValue: R2ObjectBody | null = await cache.get(
    '/datadog-aggregate-rum-events',
  );

  if (cacheValue === null) {
    this.emitPublicMetric(MetricName.DatadogAggregateRumEventsUncached);
    return undefined;
  }

  const { httpMetadata } = cacheValue;
  if (typeof httpMetadata === 'undefined') {
    this.emitPublicMetric(
      MetricName.MissingDatadogAggregateRumEventsCacheMetadata,
    );
    return undefined;
  }

  const { cacheExpiry } = httpMetadata;
  if (typeof cacheExpiry === 'undefined') {
    this.emitPublicMetric(
      MetricName.MissingDatadogAggregateRumEventsCacheExpiry,
    );
    return undefined;
  }

  if (cacheExpiry.getTime() < this.now()) {
    this.emitPublicMetric(MetricName.ExpiredDatadogAggregateRumEvents);
    return undefined;
  }

  this.emitPublicMetric(MetricName.DatadogAggregateRumEventsCached);
  return await cacheValue.json();
};

export default checkRumEventsCache;
