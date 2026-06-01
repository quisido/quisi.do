import type { AuditResult } from './adult-result.js';
import mapAuditDetailsToString from './map-audit-details-to-string.js';

export default function mapAuditResultToString({
  description,
  details,
  id,
  title,
}: AuditResult): string {
  const strings = [`${id}:`, title, description];

  if (details !== undefined) {
    strings.push(mapAuditDetailsToString(details));
  }

  return strings.join('\n');
}
