import { TableProps } from '@awsui/components-react/table';

export default function getHighlightedCells<Item>(
  rows: HTMLCollectionOf<HTMLTableRowElement>,
  rowClickDetails: TableProps.OnRowClickDetail<Item>[],
): HTMLTableCellElement[] {
  const highlightedCells: HTMLTableCellElement[] = [];

  for (const rowClickDetail of rowClickDetails) {
    const highlightedItemRow: HTMLTableRowElement | null = rows.item(
      rowClickDetail.rowIndex,
    );
    if (highlightedItemRow === null) {
      continue;
    }

    const highlightedItemCells: HTMLCollectionOf<HTMLTableCellElement> = highlightedItemRow.getElementsByTagName(
      'td',
    );

    for (const cell of Array.from(highlightedItemCells)) {
      highlightedCells.push(cell);
    }
  }

  return highlightedCells;
}
