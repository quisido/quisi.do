import CellColors from '../types/cell-colors';

export default function mapRowsToCellColors(
  rows: HTMLCollectionOf<HTMLTableRowElement>,
): CellColors | null {
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

  return {
    background: lastCell.style.getPropertyValue('background-color'),
    border: lastCell.style.getPropertyValue('border-color'),
  };
}
