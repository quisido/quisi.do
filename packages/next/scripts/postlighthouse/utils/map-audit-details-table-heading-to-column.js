const MAX_LENGTH = 20;

export default function mapAuditDetailsTableHeadingToColumn({ key, text }) {
  return {
    alignment: 'left',
    name: key,
    maxLen: MAX_LENGTH,
    title: text,
  };
}
