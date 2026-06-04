import type { LighthouseRunResult } from './lighthouse-run-result.js';
import mapAuditsToDashboard from './map-audits-to-dashboard.js';
import reduceResultEntriesToDashboard, {
  type DashboardResult,
} from './reduce-result-entries-to-dashboard.js';

type RestResult = Omit<LighthouseRunResult, 'audits'>;
type ResultEntry = readonly [keyof RestResult, RestResult[keyof RestResult]];

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
