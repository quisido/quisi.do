import type { TableProps } from '@awsui/components-react/table';
import isUndefined from '../../../utils/is-undefined';

export default function mapSortingColumnToIndex<Item>({
  sortingField,
}: Readonly<TableProps.SortingColumn<Item>>): number {
  if (isUndefined(sortingField)) {
    throw new Error('Expected column to have a sorting field.');
  }

  const index: number = parseInt(sortingField, 10);
  if (Number.isNaN(index)) {
    throw new Error('Expected column to have a numeric sorting field.');
  }

  return index;
}
