export default function mapAutoFillSetToString(
  autoFill: Set<AutoFill>,
): string {
  return [...autoFill].join(' ');
}
