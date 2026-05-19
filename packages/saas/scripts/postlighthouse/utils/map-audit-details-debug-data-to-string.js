import mapItemToString from './map-audit-details-debug-data-item-to-string.js';

export default function mapAuditDetailsDebugDataToString({ items }) {
  return items.map(mapItemToString).join('\n');
}
