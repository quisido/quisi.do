import type { AuditDetails } from './audit-details.js';

export default function mapSourceLocationToString({
  column,
  line,
  url,
}: AuditDetails.SourceLocationValue): string {
  return `${url} (line ${line}, column ${column})`;
}
