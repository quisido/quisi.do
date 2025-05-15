const MAX_LENGTH = 20;

export default function mapAuditDetailsTableHeadingToColumn({ key, text }) {
  return {
    alignment: 'left',
    maxLen: MAX_LENGTH,
    name: key,
    title: text,
  };
}
