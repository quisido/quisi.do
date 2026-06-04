import { isDefined } from 'fmrs';
import type { AuditDetails } from './audit-details.js';

export default function mapNodeToString({
  nodeLabel,
  selector,
  snippet,
}: AuditDetails.NodeValue): string {
  return [nodeLabel, snippet, selector].filter(isDefined).join(' ');
}
