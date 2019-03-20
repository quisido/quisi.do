import type CloudflareAnalytics from '../types/cloudflare-analytics.js';
import type CloudflareAnalyticsDatasets from '../types/cloudflare-analytics-datasets.js';
import isRecord from './is-record.js';

const hasNumericKeys = <K extends string>(
  record: Record<string, unknown>,
  keys: Set<K>,
): record is Record<K, number> => {
  for (const key of keys) {
    if (!(key in record) || typeof record[key] !== 'number') {
      return false;
    }
  }
  return true;
};

const RUM_PAGELOAD_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['rumPageloadEventsAdaptiveGroups']
> = new Set(['count', 'sampleInterval_avg', 'visits_sum'] as const);

const RUM_PERFORMANCE_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['rumPerformanceEventsAdaptiveGroups']
> = new Set([
  'connectionTime_avg',
  'connectionTimeP50',
  'connectionTimeP75',
  'connectionTimeP90',
  'connectionTimeP99',
  'count',
  'dnsTime_avg',
  'dnsTimeP50',
  'dnsTimeP75',
  'dnsTimeP90',
  'dnsTimeP99',
  'firstContentfulPaint_avg',
  'firstContentfulPaintP50',
  'firstContentfulPaintP75',
  'firstContentfulPaintP90',
  'firstContentfulPaintP99',
  'firstPaint_avg',
  'firstPaintP50',
  'firstPaintP75',
  'firstPaintP90',
  'firstPaintP99',
  'loadEventTime_avg',
  'loadEventTimeP50',
  'loadEventTimeP75',
  'loadEventTimeP90',
  'loadEventTimeP99',
  'pageLoadTime_avg',
  'pageLoadTimeP50',
  'pageLoadTimeP75',
  'pageLoadTimeP90',
  'pageLoadTimeP99',
  'pageRenderTime_avg',
  'pageRenderTimeP50',
  'pageRenderTimeP75',
  'pageRenderTimeP90',
  'pageRenderTimeP99',
  'requestTime_avg',
  'requestTimeP50',
  'requestTimeP75',
  'requestTimeP90',
  'requestTimeP99',
  'responseTime_avg',
  'responseTimeP50',
  'responseTimeP75',
  'responseTimeP90',
  'responseTimeP99',
  'sampleInterval_avg',
  'visits_sum',
] as const);

const WORKERS_ANALYTICS_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['workersAnalyticsEngineAdaptiveGroups']
> = new Set(['count'] as const);

const WORKERS_INVOCATION_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['workersInvocationsAdaptive']
> = new Set([
  'cpuTime_max',
  'cpuTime_min',
  'cpuTimeP25',
  'cpuTimeP50',
  'cpuTimeP75',
  'cpuTimeP90',
  'cpuTimeP99',
  'cpuTimeP999',
  'duration_max',
  'duration_min',
  'duration_sum',
  'durationP25',
  'durationP50',
  'durationP75',
  'durationP90',
  'durationP99',
  'durationP999',
  'errors_sum',
  'requests_sum',
  'responseBodySize_max',
  'responseBodySize_min',
  'responseBodySize_sum',
  'responseBodySizeP25',
  'responseBodySizeP50',
  'responseBodySizeP75',
  'responseBodySizeP90',
  'responseBodySizeP99',
  'responseBodySizeP999',
  'sampleInterval_avg',
  'subrequests_sum',
  'wallTime_max',
  'wallTime_min',
  'wallTime_sum',
  'wallTimeP25',
  'wallTimeP50',
  'wallTimeP75',
  'wallTimeP90',
  'wallTimeP99',
  'wallTimeP999',
] as const);

export default function isCloudflareAnalytics(
  value: unknown,
): value is CloudflareAnalytics {
  if (!isRecord(value)) {
    return false;
  }

  const { budget, datasets } = value;
  if (typeof budget !== 'number' || !isRecord(datasets)) {
    return false;
  }

  const {
    rumPageloadEventsAdaptiveGroups,
    rumPerformanceEventsAdaptiveGroups,
    workersAnalyticsEngineAdaptiveGroups,
    workersInvocationsAdaptive,
  } = datasets;
  return (
    isRecord(rumPageloadEventsAdaptiveGroups) &&
    isRecord(rumPerformanceEventsAdaptiveGroups) &&
    isRecord(workersAnalyticsEngineAdaptiveGroups) &&
    isRecord(workersInvocationsAdaptive) &&
    hasNumericKeys(rumPageloadEventsAdaptiveGroups, RUM_PAGELOAD_KEYS) &&
    hasNumericKeys(rumPerformanceEventsAdaptiveGroups, RUM_PERFORMANCE_KEYS) &&
    hasNumericKeys(
      workersAnalyticsEngineAdaptiveGroups,
      WORKERS_ANALYTICS_KEYS,
    ) &&
    hasNumericKeys(workersInvocationsAdaptive, WORKERS_INVOCATION_KEYS)
  );
}
