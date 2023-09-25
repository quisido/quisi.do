const FIRST = 0;

export default function mapRowToCellClassName(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  row: HTMLTableRowElement,
): string | null {
  const firstCell: HTMLTableCellElement | null = row
    .getElementsByTagName('td')
    .item(FIRST);
  if (firstCell === null) {
    return null;
  }

  return firstCell.className;
}
