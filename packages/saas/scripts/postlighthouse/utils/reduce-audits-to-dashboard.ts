import type { AuditResult } from './audit-result.js';

const IGNORED_SCORE_DISPLAY_MODES = new Set<AuditResult['scoreDisplayMode']>([
  'informative',
  'manual',
  'notApplicable',
]);

export type DashboardAudit = Omit<AuditResult, 'id'>;
export type DashboardAudits = Readonly<Record<string, DashboardAudit>>;

export default function reduceAuditsToDashboard(
  audits: DashboardAudits,
  { id, scoreDisplayMode, ...audit }: AuditResult,
): DashboardAudits {
  if (IGNORED_SCORE_DISPLAY_MODES.has(scoreDisplayMode)) {
    return audits;
  }

  return {
    ...audits,
    [id]: {
      ...audit,
      scoreDisplayMode,
    },
  };
}
