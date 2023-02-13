import type CloudflareAnalytics from '../types/cloudflare-analytics';
import type CloudflareAnalyticsDatasets from '../types/cloudflare-analytics-datasets';
import findRecord from './find-record';

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
> = new Set(['count', 'sampleInterval.avg', 'visits.sum']);

const RUM_PERFORMANCE_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['rumPerformanceEventsAdaptiveGroups']
> = new Set([
  'connectionTime.avg',
  'connectionTimeP50',
  'connectionTimeP75',
  'connectionTimeP90',
  'connectionTimeP99',
  'count',
  'dnsTime.avg',
  'dnsTimeP50',
  'dnsTimeP75',
  'dnsTimeP90',
  'dnsTimeP99',
  'firstContentfulPaint.avg',
  'firstContentfulPaintP50',
  'firstContentfulPaintP75',
  'firstContentfulPaintP90',
  'firstContentfulPaintP99',
  'firstPaint.avg',
  'firstPaintP50',
  'firstPaintP75',
  'firstPaintP90',
  'firstPaintP99',
  'loadEventTime.avg',
  'loadEventTimeP50',
  'loadEventTimeP75',
  'loadEventTimeP90',
  'loadEventTimeP99',
  'pageLoadTime.avg',
  'pageLoadTimeP50',
  'pageLoadTimeP75',
  'pageLoadTimeP90',
  'pageLoadTimeP99',
  'pageRenderTime.avg',
  'pageRenderTimeP50',
  'pageRenderTimeP75',
  'pageRenderTimeP90',
  'pageRenderTimeP99',
  'requestTime.avg',
  'requestTimeP50',
  'requestTimeP75',
  'requestTimeP90',
  'requestTimeP99',
  'responseTime.avg',
  'responseTimeP50',
  'responseTimeP75',
  'responseTimeP90',
  'responseTimeP99',
  'sampleInterval.avg',
  'visits.sum',
]);

const WORKERS_ANALYTICS_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['workersAnalyticsEngineAdaptiveGroups']
> = new Set(['count']);

const WORKERS_INVOCATION_KEYS: Set<
  keyof CloudflareAnalyticsDatasets['workersInvocationsAdaptive']
> = new Set([
  'cpuTime.max',
  'cpuTime.min',
  'cpuTimeP25',
  'cpuTimeP50',
  'cpuTimeP75',
  'cpuTimeP90',
  'cpuTimeP99',
  'cpuTimeP999',
  'duration.max',
  'duration.min',
  'duration.sum',
  'durationP25',
  'durationP50',
  'durationP75',
  'durationP90',
  'durationP99',
  'durationP999',
  'errors.sum',
  'requests.sum',
  'responseBodySize.max',
  'responseBodySize.min',
  'responseBodySize.sum',
  'responseBodySizeP25',
  'responseBodySizeP50',
  'responseBodySizeP75',
  'responseBodySizeP90',
  'responseBodySizeP99',
  'responseBodySizeP999',
  'sampleInterval.avg',
  'subrequests.sum',
  'wallTime.max',
  'wallTime.min',
  'wallTime.sum',
  'wallTimeP25',
  'wallTimeP50',
  'wallTimeP75',
  'wallTimeP90',
  'wallTimeP99',
  'wallTimeP999',
]);

export default function findCloudflareAnalytics(
  value: unknown,
): value is CloudflareAnalytics {
  if (!findRecord(value)) {
    return false;
  }

  const { budget, datasets } = value;
  if (typeof budget !== 'number' || !findRecord(datasets)) {
    return false;
  }

  const {
    rumPageloadEventsAdaptiveGroups,
    rumPerformanceEventsAdaptiveGroups,
    workersAnalyticsEngineAdaptiveGroups,
    workersInvocationsAdaptive,
  } = datasets;
  return (
    findRecord(rumPageloadEventsAdaptiveGroups) &&
    findRecord(rumPerformanceEventsAdaptiveGroups) &&
    findRecord(workersAnalyticsEngineAdaptiveGroups) &&
    findRecord(workersInvocationsAdaptive) &&
    hasNumericKeys(rumPageloadEventsAdaptiveGroups, RUM_PAGELOAD_KEYS) &&
    hasNumericKeys(rumPerformanceEventsAdaptiveGroups, RUM_PERFORMANCE_KEYS) &&
    hasNumericKeys(
      workersAnalyticsEngineAdaptiveGroups,
      WORKERS_ANALYTICS_KEYS,
    ) &&
    hasNumericKeys(workersInvocationsAdaptive, WORKERS_INVOCATION_KEYS)
  );
}
