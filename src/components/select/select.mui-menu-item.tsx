import MenuItem from '@mui/material/MenuItem';
import type { ReactElement } from 'react';
import type Props from './types/mui-menu-item-props';

export default function MuiSelectMenuItem({
  children,
  value,
}: Readonly<Props>): ReactElement {
  return <MenuItem value={value}>{children}</MenuItem>;
}
