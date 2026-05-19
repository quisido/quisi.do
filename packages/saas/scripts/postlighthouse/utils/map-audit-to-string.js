import mapAuditDetailsToString from './map-audit-details-to-string.js';

export default function mapAuditToString({ description, details, id, title }) {
  const strings = [`${id}:`, title, description];

  if (details !== undefined) {
    strings.push(mapAuditDetailsToString(details));
  }

  return strings.join('\n');
}
