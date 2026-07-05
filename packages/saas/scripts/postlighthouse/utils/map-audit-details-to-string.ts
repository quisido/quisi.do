import AuditDetailsTable from './audit-details-table.js';
import mapAuditDetailsDebugDataToString from './map-audit-details-debug-data-to-string.js';
import mapNodeToString from './map-node-to-string.js';
import type { AuditDetails } from './audit-details.js';
import type { IcuMessage } from 'lighthouse';

const mapMessageToString = (value: IcuMessage | string): string => {
  if (typeof value === 'string') {
    return value;
  }

  return value.formattedDefault;
};

export default function mapAuditDetailsToString(
  details:
    AuditDetails | AuditDetails.ListSectionItem | AuditDetails.ListableDetail,
): string {
  switch (details.type) {
    case 'checklist':
    case 'criticalrequestchain':
    case 'filmstrip':
    case 'network-tree':
    case 'opportunity':
    case 'screenshot':
    case 'treemap-data': {
      throw new Error(`Unsupported audit detail type: ${details.type}`, {
        cause: details,
      });
    }

    case 'debugdata':
      return mapAuditDetailsDebugDataToString(details);

    case 'list':
      return details.items.map(mapAuditDetailsToString).join('\n');

    case 'list-section': {
      const messages: string[] = [];
      if (details.title !== undefined) {
        messages.push(mapMessageToString(details.title));
      }
      if (details.description !== undefined) {
        messages.push(mapMessageToString(details.description));
      }

      return [...messages, mapAuditDetailsToString(details.value)].join('\n');
    }

    case 'node':
      return mapNodeToString(details);

    case 'table':
      return new AuditDetailsTable(details).toString();

    case 'text':
      return mapMessageToString(details.value);
  }
}
