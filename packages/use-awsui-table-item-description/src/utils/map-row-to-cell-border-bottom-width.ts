const INDEX_OFFSET = 1;

export default function mapRowToCellBorderBottomWidth(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  row: HTMLTableRowElement,
): string | null {
  const cells: HTMLCollectionOf<HTMLTableCellElement> =
    row.getElementsByTagName('td');
  const lastCell: HTMLTableCellElement | null = cells.item(
    cells.length - INDEX_OFFSET,
  );
  if (lastCell === null) {
    return null;
  }

  return lastCell.style.getPropertyValue('border-bottom-width');
}
