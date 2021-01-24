export default function mapRowsToCellBorderBottomWidth(
  rows: HTMLCollectionOf<HTMLTableRowElement>,
): null | string {
  const firstRow: HTMLTableRowElement | null = rows.item(0);
  if (firstRow === null) {
    return null;
  }

  const cells: HTMLCollectionOf<HTMLTableCellElement> = firstRow.getElementsByTagName(
    'td',
  );
  const lastCell: HTMLTableCellElement | null = cells.item(cells.length - 1);
  if (lastCell === null) {
    return null;
  }

  return lastCell.style.getPropertyValue('border-bottom-width');
}
