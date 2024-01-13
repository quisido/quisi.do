import Cell from '@mui/material/TableCell';
import { type ReactElement } from 'react';
import type Props from '../../types/cell-props.js';

export default function MuiTableCell({ Content, align }: Props): ReactElement {
  return (
    <Cell align={align}>
      <Content />
    </Cell>
  );
}
