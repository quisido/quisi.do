import { type Attributes } from 'react';
import type Column from '../../../../../types/table-column';
import type HeadCellProps from '../types/head-cell-props';

const FIRST_INDEX = 0;

export default function mapColumnToHeadCellPartialProps<Item>(
  { header }: Column<Item>,
  index: number,
): Omit<HeadCellProps, 'active' | 'ascending' | 'onSort'> &
  Required<Attributes> {
  return {
    align: index === FIRST_INDEX ? 'left' : 'right',
    header,
    key: index,
  };
}
