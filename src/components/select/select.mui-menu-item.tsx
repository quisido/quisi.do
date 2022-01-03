// import MenuItem from '@mui/material/MenuItem';
import type { ReactElement } from 'react';
import type Props from './types/mui-menu-item-props';

/**
 * `option` should be a `MenuItem` component, but `MenuItem` fails to fire the
 *   change event.
 */

export default function MuiSelectMenuItem({
  children,
  value,
}: Readonly<Props>): ReactElement {
  return <option value={value}>{children}</option>;
}
