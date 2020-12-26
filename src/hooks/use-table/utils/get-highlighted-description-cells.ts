import { TableProps } from '@awsui/components-react/table';

export default function getHighlightedDescriptionCells<Item>(
  rows: HTMLCollectionOf<HTMLTableRowElement>,
  rowClickDetails: TableProps.OnRowClickDetail<Item>[],
): HTMLTableCellElement[] {
  const highlightedDescriptionCells: HTMLTableCellElement[] = [];

  for (const rowClickDetail of rowClickDetails) {
    const highlightedDescriptionRow: HTMLTableRowElement | null = rows.item(
      rowClickDetail.rowIndex * 2 + 1,
    );
    if (highlightedDescriptionRow === null) {
      continue;
    }

    const highlightedDescriptionCell: HTMLTableCellElement | null = highlightedDescriptionRow
      .getElementsByTagName('td')
      .item(0);
    if (highlightedDescriptionCell === null) {
      continue;
    }

    highlightedDescriptionCells.push(highlightedDescriptionCell);
  }

  return highlightedDescriptionCells;
}
