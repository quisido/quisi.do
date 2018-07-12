import type Column from '../../../../../types/table-column.js';
import type { WithKey } from '../../../../../types/with-key.js';
import type HeadCellProps from '../types/head-cell-props.js';

const FIRST_INDEX = 0;

export default function mapColumnToHeadCellPartialProps<Item>(
  { header }: Column<Item>,
  index: number,
): WithKey<Omit<HeadCellProps, 'active' | 'ascending' | 'onSort'>> {
  return {
    align: index === FIRST_INDEX ? 'left' : 'right',
    header,
    key: index,
  };
}
