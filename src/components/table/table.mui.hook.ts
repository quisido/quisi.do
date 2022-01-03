import type TableColumn from '../../types/table-column';

interface Props<Item> {
  readonly columns: readonly TableColumn<Item>[];
  readonly rows: readonly Item[];
}

export default function useMuiTable<Item>({
  columns,
  rows,
}: Props<Item>): void {
  console.log(columns);
  console.log(rows);
  return;
}
