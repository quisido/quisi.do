import reduceAuditsToDashboard from './reduce-audits-to-dashboard.js';

export default function mapAuditsToDashboard(auditsRecord) {
  const audits = Object.values(auditsRecord);
  return audits.reduce(reduceAuditsToDashboard, {});
}
