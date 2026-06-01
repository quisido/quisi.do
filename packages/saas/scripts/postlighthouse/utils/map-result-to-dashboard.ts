import { type default as Result } from 'lighthouse/types/lhr/lhr.js';
import mapAuditsToDashboard from './map-audits-to-dashboard.js';
import reduceResultEntriesToDashboard, {
  type DashboardResult,
} from './reduce-result-entries-to-dashboard.js';

type ResultEntry = readonly [
  keyof Omit<Result, 'audits'>,
  Omit<Result, 'audits'>[keyof Omit<Result, 'audits'>],
];

export default function mapResultToDashboard({
  audits,
  ...restResult
}: Result): string {
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
