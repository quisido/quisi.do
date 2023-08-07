import type { TableProps } from '@cloudscape-design/components/table';

export default function mapSortingColumnToIndex<Item>({
  sortingField,
}: Readonly<TableProps.SortingColumn<Item>>): number {
  if (typeof sortingField === 'undefined') {
    throw new Error('Expected column to have a sorting field.');
  }

  const index: number = parseInt(sortingField, 10);
  if (Number.isNaN(index)) {
    throw new Error('Expected column to have a numeric sorting field.');
  }

  return index;
}
