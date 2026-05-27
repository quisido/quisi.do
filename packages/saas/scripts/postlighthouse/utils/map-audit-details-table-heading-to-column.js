const MAX_LENGTH = 20;

export default function mapAuditDetailsTableHeadingToColumn({
  key,
  label,
  text,
}) {
  return {
    alignment: 'left',
    maxLen: MAX_LENGTH,
    name: key,
    title: label ?? text,
  };
}
