import AuditDetailsTable from './audit-details-table.js';
import mapAuditDetailsDebugDataToString from './map-audit-details-debug-data-to-string.js';

export default function mapAuditDetailsToString({ type, ...details }) {
  switch (type) {
    case 'debugdata':
      return mapAuditDetailsDebugDataToString(details);
    case 'table':
      return new AuditDetailsTable(details).toString();
    default:
      throw new Error(`Unexpected audit detail type: ${type}
${JSON.stringify(details)}`);
  }
}
