import type { ReactElement } from 'react';
import type { MenuItemCheckboxProps } from '../shared/menu-item-checkbox-props.js';

/**
 *   A `MenuItemCheckbox` component is a `MenuItem` with a checkable state
 * whose value may be `true`, `false`, or `mixed`.
 */
export default function MenuItemCheckbox({
  checked = false,
  children,
}: MenuItemCheckboxProps): ReactElement {
  return (
    <li aria-checked={checked} role="menuitemcheckbox">
      {children}
    </li>
  );
}
