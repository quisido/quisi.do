import {
  MILLISECONDS_PER_MINUTE,
  SECONDS_PER_MINUTE,
} from '../constants/time.js';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import type { DatadogAggregateRumEvents } from './datadog-aggregate-rum-events.js';

const CACHE_EXPIRY_MINUTES = 5;
const CACHE_KEY = '/datadog-aggregate-rum-events';

const storeRumEventsCache = function storeRumEventsCache(
  this: DashboardFetchHandler,
  cache: R2Bucket,
  value: DatadogAggregateRumEvents,
): void {
  const cacheExpiry = new Date(
    this.now() + CACHE_EXPIRY_MINUTES * MILLISECONDS_PER_MINUTE,
  );
  this.affect(
    cache.put(CACHE_KEY, JSON.stringify(value), {
      httpMetadata: {
        cacheControl: `immutable, max-age=${CACHE_EXPIRY_MINUTES * SECONDS_PER_MINUTE}, public`,
        cacheExpiry,
        contentType: 'application/json',
      },
      storageClass: 'Standard',
    }),
  );
};

export default storeRumEventsCache;
