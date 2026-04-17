import type { ReactElement } from 'react';
import type { MenuItem, MenuProps } from '../core/menu-props.js';
import classes from './menu.module.scss';

/**
 *   A menu is a type of widget that offers a list of choices to the user.
 *   A menu is a container, generally rendered as a popup or overlay, for a set
 * of menu items that can be invoked to perform an action or function. The
 * function is almost always closely related or directly related to the element
 * that the user activated to invoke the menu. Activating a menu item both
 * performs the associated function of the menu item, and results in the
 * automatic dismissal of the menu.
 *   A menu is appropriate when a set of menu items is presented in a manner
 * similar to a popup menu. For instance, a menu could be used to represent a
 * context menu for its invoking element, or it would be used to render
 * sub-menus for items of a menubar or another menu popup.
 * @see {@link https://w3c.github.io/aria/#menu | WAI-ARIA `menu` role}
 */
export default function Menu({
  items,
  orientation = 'vertical',
}: MenuProps): ReactElement {
  return (
    <ul aria-orientation={orientation} className={classes['menu']} role="menu">
      {items.map(
        ({ children, disabled, items, key }: MenuItem): ReactElement => (
          <li
            aria-disabled={disabled}
            aria-haspopup={items !== undefined}
            key={key}
            role="menuitem"
          >
            {children}
          </li>
        ),
      )}
    </ul>
  );
}
