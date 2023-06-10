import type WorkersInvocations from './cloudflare-workers-invocations';

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
  readonly clientSSLMap_sum: Dimension<string, 'requests'>;
  readonly countryMap_sum: Dimension<string, 'bytes' | 'requests' | 'threats'>;
  readonly encryptedBytes_sum: number;
  readonly encryptedRequests_sum: number;
  readonly pageViews_sum: number;
  readonly requests_sum: number;
  readonly responseStatusMap_sum: Dimension<number, 'requests'>;
  readonly threatPathingMap_sum: Dimension<string, 'requests'>;
  readonly threats_sum: number;
  readonly uniques_uniq: number;
}

export default interface CloudflareAnalyticsDatasets {
  readonly workersAnalyticsEngineAdaptiveGroups: Record<'count', number>;
  readonly workersInvocationsAdaptive: WorkersInvocations;

  readonly httpRequests1hGroups: HttpRequests1hGroups;

  readonly rumPageloadEventsAdaptiveGroups: Record<
    'count' | 'sampleInterval_avg' | 'visits_sum',
    number
  >;

  readonly rumPerformanceEventsAdaptiveGroups: Record<
    | 'connectionTime_avg'
    | 'connectionTimeP50'
    | 'connectionTimeP75'
    | 'connectionTimeP90'
    | 'connectionTimeP99'
    | 'count'
    | 'dnsTime_avg'
    | 'dnsTimeP50'
    | 'dnsTimeP75'
    | 'dnsTimeP90'
    | 'dnsTimeP99'
    | 'firstContentfulPaint_avg'
    | 'firstContentfulPaintP50'
    | 'firstContentfulPaintP75'
    | 'firstContentfulPaintP90'
    | 'firstContentfulPaintP99'
    | 'firstPaint_avg'
    | 'firstPaintP50'
    | 'firstPaintP75'
    | 'firstPaintP90'
    | 'firstPaintP99'
    | 'loadEventTime_avg'
    | 'loadEventTimeP50'
    | 'loadEventTimeP75'
    | 'loadEventTimeP90'
    | 'loadEventTimeP99'
    | 'pageLoadTime_avg'
    | 'pageLoadTimeP50'
    | 'pageLoadTimeP75'
    | 'pageLoadTimeP90'
    | 'pageLoadTimeP99'
    | 'pageRenderTime_avg'
    | 'pageRenderTimeP50'
    | 'pageRenderTimeP75'
    | 'pageRenderTimeP90'
    | 'pageRenderTimeP99'
    | 'requestTime_avg'
    | 'requestTimeP50'
    | 'requestTimeP75'
    | 'requestTimeP90'
    | 'requestTimeP99'
    | 'responseTime_avg'
    | 'responseTimeP50'
    | 'responseTimeP75'
    | 'responseTimeP90'
    | 'responseTimeP99'
    | 'sampleInterval_avg'
    | 'visits_sum',
    number
  >;
}
