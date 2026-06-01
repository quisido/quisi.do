import { type default as Result } from 'lighthouse/types/lhr/lhr.js';

type DashboardResultKey = keyof Omit<Result, 'audits'>;
type DashboardResultValue = Omit<Result, 'audits'>[DashboardResultKey];

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
