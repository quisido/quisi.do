import type { AuditDetails } from './audit-details.js';

export default function mapNodeToString({
  nodeLabel,
  selector,
  snippet,
}: AuditDetails.NodeValue): string {
  return [nodeLabel, snippet, selector]
    .filter((value): value is string => value !== undefined)
    .join(' ');
}
