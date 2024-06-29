export default function formatLineColumnNumbers(
  lineNumber: number | null,
  columnNumber: number | null,
): string | null {
  if (lineNumber === null) {
    return null;
  }

  if (columnNumber === null) {
    return `:${lineNumber.toString()}`;
  }

  return `:${lineNumber.toString()}:${columnNumber.toString()}`;
}
