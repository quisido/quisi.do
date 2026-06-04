import type { LighthouseRunResult } from './lighthouse-run-result.js';
import mapAuditsToDashboard from './map-audits-to-dashboard.js';
import reduceResultEntriesToDashboard, {
  type DashboardResult,
} from './reduce-result-entries-to-dashboard.js';

type ResultEntry = readonly [
  keyof Omit<LighthouseRunResult, 'audits'>,
  Omit<LighthouseRunResult, 'audits'>[keyof Omit<
    LighthouseRunResult,
    'audits'
  >],
];

export default function mapResultToDashboard({
  audits,
  ...restResult
}: LighthouseRunResult): string {
  const resultEntries = Object.entries(restResult) as ResultEntry[];
  const dashboardJson = resultEntries.reduce<DashboardResult>(
    reduceResultEntriesToDashboard,
    {},
  );

  return JSON.stringify({
    ...dashboardJson,
    audits: mapAuditsToDashboard(audits),
  });
}
