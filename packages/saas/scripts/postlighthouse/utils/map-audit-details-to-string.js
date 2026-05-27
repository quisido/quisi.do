import AuditDetailsTable from './audit-details-table.js';
import mapAuditDetailsDebugDataToString from './map-audit-details-debug-data-to-string.js';
import mapNodeToString from './map-node-to-string.js';

const mapAuditDetailsListSectionToString = (
  { description, title, value },
  stringifyAuditDetails,
) => {
  return [title, description, stringifyAuditDetails(value)]
    .filter(string => string !== undefined)
    .join('\n');
};

const mapAuditDetailsListItemToString = (
  { type, ...details },
  stringifyAuditDetails,
) => {
  switch (type) {
    case 'list-section':
      return mapAuditDetailsListSectionToString(details, stringifyAuditDetails);
    case 'node':
      return mapNodeToString(details);
    case 'text':
      return details.value;
    default:
      return stringifyAuditDetails({
        ...details,
        type,
      });
  }
};

const mapAuditDetailsListToString = ({ items }, stringifyAuditDetails) => {
  return items
    .map(item => mapAuditDetailsListItemToString(item, stringifyAuditDetails))
    .join('\n');
};

const mapAuditDetailsToString = ({ type, ...details }) => {
  switch (type) {
    case 'debugdata':
      return mapAuditDetailsDebugDataToString(details);
    case 'list':
      return mapAuditDetailsListToString(details, mapAuditDetailsToString);
    case 'table':
      return new AuditDetailsTable(details).toString();
    default:
      throw new Error(`Unexpected audit detail type: ${type}
${JSON.stringify(details)}`);
  }
};

export default mapAuditDetailsToString;
