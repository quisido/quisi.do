import mapAuditsToDashboard from './map-audits-to-dashboard.js';
import reduceResultEntriesToDashboard from './reduce-result-entries-to-dashboard.js';

export default function mapResultToDashboard({ audits, ...restResult }) {
  const resultEntries = Object.entries(restResult);
  const dashboardJson = resultEntries.reduce(
    reduceResultEntriesToDashboard,
    {},
  );

  return JSON.stringify({
    ...dashboardJson,
    audits: mapAuditsToDashboard(audits),
  });
}
