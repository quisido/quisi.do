import type { Attributes } from 'react';
import type Column from '../../../types/table-column';
import type MuiHeadCellProps from '../types/mui-head-cell-props';

const FIRST_INDEX = 0;

export default function mapColumnToHeadCellPartialProps<Item>(
  { header }: Column<Item>,
  index: number,
): Required<Attributes> &
  Omit<MuiHeadCellProps, 'active' | 'ascending' | 'onSort'> {
  return {
    align: index === FIRST_INDEX ? 'left' : 'right',
    header,
    key: index,
  };
}
