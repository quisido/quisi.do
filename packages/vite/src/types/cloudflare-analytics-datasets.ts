import { type CloudflareRumPerformanceEvents } from './cloudflare-rum-performance-events.js';
import { type CloudflareWorkersInvocations } from './cloudflare-workers-invocations.js';

interface HasKey<K extends number | string> {
  readonly key: K;
}

type WithKey<K extends number | string, T> = HasKey<K> & T;

type Dimension<K extends number | string, V extends string> = WithKey<
  K,
  Record<V, number>
>;

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
  readonly rumPerformanceEventsAdaptiveGroups: CloudflareRumPerformanceEvents;
  readonly workersAnalyticsEngineAdaptiveGroups: Record<'count', number>;
  readonly workersInvocationsAdaptive: CloudflareWorkersInvocations;
  readonly rumPageloadEventsAdaptiveGroups: Record<
    'count' | 'sampleInterval_avg' | 'visits_sum',
    number
  >;
}
