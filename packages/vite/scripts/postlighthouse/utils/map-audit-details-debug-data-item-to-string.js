export default function mapAuditDetailsDebugDataItemToString({ failures }) {
  return failures.join('\n');
}
