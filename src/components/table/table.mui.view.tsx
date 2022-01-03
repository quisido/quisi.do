import type { ReactElement } from 'react';
import useMuiTable from './table.mui.hook';
import type Props from './types/props';

export default function MuiTable<Item>({
  columns,
  rows,
}: Readonly<Props<Item>>): ReactElement {
  useMuiTable({ columns, rows });

  return <>MUI table</>;
}
