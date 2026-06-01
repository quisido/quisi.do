import { isArray } from 'fmrs';
import type { AuditDetails } from './audit-details.js';
import mapItemToString from './map-audit-details-debug-data-item-to-string.js';

export default function mapAuditDetailsDebugDataToString({
  items,
}: AuditDetails.DebugData): string {
  if (!isArray(items)) {
    throw new Error('Expected debug data items to be an array.', {
      cause: items,
    });
  }

  return items.map(mapItemToString).join('\n');
}
