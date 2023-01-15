import Cell from '@mui/material/TableCell';
import type { ReactElement } from 'react';
import type Props from '../../types/mui-cell-props';

export default function MuiTableCell({
  Content,
  align,
}: Readonly<Props>): ReactElement {
  return (
    <Cell align={align}>
      <Content />
    </Cell>
  );
}
