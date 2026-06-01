import type { AuditResult } from './adult-result.js';
import reduceAuditsToDashboard, {
  type DashboardAudits,
} from './reduce-audits-to-dashboard.js';

export default function mapAuditsToDashboard(
  auditsRecord: Record<string, AuditResult>,
): DashboardAudits {
  const audits = Object.values(auditsRecord);
  return audits.reduce(reduceAuditsToDashboard, {});
}
