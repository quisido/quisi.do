import AuditDetailsTable from './audit-details-table.js';
import mapAuditDetailsDebugDataToString from './map-audit-details-debug-data-to-string.js';
import mapNodeToString from './map-node-to-string.js';

function mapAuditDetailsListSectionToString({ description, title, value }) {
  return [title, description, mapAuditDetailsToString(value)]
    .filter(string => string !== undefined)
    .join('\n');
}

function mapAuditDetailsListItemToString({ type, ...details }) {
  switch (type) {
    case 'list-section':
      return mapAuditDetailsListSectionToString(details);
    case 'node':
      return mapNodeToString(details);
    case 'text':
      return details.value;
    default:
      return mapAuditDetailsToString({
        ...details,
        type,
      });
  }
}

function mapAuditDetailsListToString({ items }) {
  return items.map(mapAuditDetailsListItemToString).join('\n');
}

export default function mapAuditDetailsToString({ type, ...details }) {
  switch (type) {
    case 'debugdata':
      return mapAuditDetailsDebugDataToString(details);
    case 'list':
      return mapAuditDetailsListToString(details);
    case 'table':
      return new AuditDetailsTable(details).toString();
    default:
      throw new Error(`Unexpected audit detail type: ${type}
${JSON.stringify(details)}`);
  }
}
