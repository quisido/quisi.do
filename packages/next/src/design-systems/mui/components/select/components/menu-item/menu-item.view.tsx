// import MenuItem from '@mui/material/MenuItem';
import { type ReactElement } from 'react';
import type Props from '../../types/menu-item-props.js';

/**
 * `option` should be a `MenuItem` component, but `MenuItem` fails to fire the
 *   change event.
 */

export default function MuiSelectMenuItem({
  children,
  value,
}: Props): ReactElement {
  return <option value={value}>{children}</option>;
}
