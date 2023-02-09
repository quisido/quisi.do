import type CloudflareAnalytics from '../types/types';
import findRecord from './find-record';

export default function findCloudflareAnalytics(
  value: unknown,
): value is CloudflareAnalytics {
  return (
    findRecord(value) &&
    typeof value.budget === 'number' &&
    findRecord(value.datasets) &&
    findRecord(value.datasets.rumPageloadEventsAdaptiveGroups) &&
    findRecord(value.datasets.rumPerformanceEventsAdaptiveGroups) &&
    findRecord(value.datasets.workersAnalyticsEngineAdaptiveGroups) &&
    findRecord(value.datasets.workersInvocationsAdaptive)
  );
}
