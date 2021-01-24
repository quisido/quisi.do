export default function mapRowToCellClassName(
  row: HTMLTableRowElement,
): null | string {
  const firstCell: HTMLTableCellElement | null = row
    .getElementsByTagName('td')
    .item(0);
  if (firstCell === null) {
    return null;
  }
  return firstCell.className;
}
