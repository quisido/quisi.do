import type RumPerformanceEvents from './cloudflare-rum-performance-events.js';
import type WorkersInvocations from './cloudflare-workers-invocations.js';

type WithKey<K extends number | string, T> = HasKey<K> & T;

type Dimension<K extends number | string, V extends string> = WithKey<
  K,
  Record<V, number>
>;

interface HasKey<K extends number | string> {
  readonly key: K;
}

interface HttpRequests1hGroups {
  readonly bytes_sum: number;
  readonly cachedBytes_sum: number;
  readonly cachedRequests_sum: number;
  readonly countryMap_sum: Dimension<string, 'bytes' | 'requests' | 'threats'>;
  readonly encryptedBytes_sum: number;
  readonly encryptedRequests_sum: number;
  readonly pageViews_sum: number;
  readonly requests_sum: number;
  readonly responseStatusMap_sum: Dimension<number, 'requests'>;
  readonly threatPathingMap_sum: Dimension<string, 'requests'>;
  readonly threats_sum: number;
  readonly uniques_uniq: number;
  readonly clientSSLMap_sum: readonly WithKey<
    string,
    Record<'requests', number>
  >[];
}

export default interface CloudflareAnalyticsDatasets {
  readonly httpRequests1hGroups: HttpRequests1hGroups;
  readonly rumPerformanceEventsAdaptiveGroups: RumPerformanceEvents;
  readonly workersAnalyticsEngineAdaptiveGroups: Record<'count', number>;
  readonly workersInvocationsAdaptive: WorkersInvocations;
  readonly rumPageloadEventsAdaptiveGroups: Record<
    'count' | 'sampleInterval_avg' | 'visits_sum',
    number
  >;
}
