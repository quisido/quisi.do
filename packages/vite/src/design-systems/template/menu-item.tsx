import type { ReactElement } from 'react';
import type { MenuItemProps } from '../core/menu-item-props.js';

/**
 *   A `MenuItem` component is an option in a set of choices contained by a
 * `Menu` or `MenuBar`. It can also be used to launch a submenu when it has a
 * popup.
 */
export default function MenuItem({ children }: MenuItemProps): ReactElement {
  return <li role="menuitem">{children}</li>;
}
