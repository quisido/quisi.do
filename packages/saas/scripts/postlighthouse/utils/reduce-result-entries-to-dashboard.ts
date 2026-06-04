import type { LighthouseRunResult } from './lighthouse-run-result.js';

type DashboardResultKey = keyof Omit<LighthouseRunResult, 'audits'>;
type DashboardResultValue = Omit<
  LighthouseRunResult,
  'audits'
>[DashboardResultKey];

const IGNORED_REPORT_KEYS = new Set([
  'configSettings',
  'environment',
  'finalUrl',
  'gatherMode',
  'i18n',
  'requestedUrl',
  'timing',
  'userAgent',
]);

export type DashboardResult = Readonly<Record<string, DashboardResultValue>>;

export default function reduceResultEntriesToDashboard(
  dashboard: DashboardResult,
  [key, value]: readonly [DashboardResultKey, DashboardResultValue],
): DashboardResult {
  if (IGNORED_REPORT_KEYS.has(key)) {
    return dashboard;
  }

  return {
    ...dashboard,
    [key]: value,
  };
}
