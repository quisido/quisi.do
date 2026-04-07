import type { ReactElement } from 'react';
import type { MenuItemRadioProps } from '../core/menu-item-radio-props.js';

/**
 *   A `MenuItemRadio` component is a checkable `MenuItem` in a set where only
 * one item can be checked at a time.
 */
export default function MenuItemRadio({
  checked = false,
  children,
}: MenuItemRadioProps): ReactElement {
  return (
    <li aria-checked={checked} role="menuitemradio">
      {children}
    </li>
  );
}
