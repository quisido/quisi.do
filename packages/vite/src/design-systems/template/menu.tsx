import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  useRef,
  useState,
} from 'react';
import type { MenuItem, MenuProps } from '../core/menu-props.js';
import classes from './menu.module.scss';

/**
 * A menu is a type of widget that offers a list of choices to the user.
 * A menu is a container, generally rendered as a popup or overlay, for a set
 * of menu items that can be invoked to perform an action or function. The
 * function is almost always closely related or directly related to the element
 * that the user activated to invoke the menu. Activating a menu item both
 * performs the associated function of the menu item, and results in the
 * automatic dismissal of the menu.
 * A menu is appropriate when a set of menu items is presented in a manner
 * similar to a popup menu. For instance, a menu could be used to represent a
 * context menu for its invoking element, or it would be used to render
 * sub-menus for items of a menubar or another menu popup.
 * @see {@link https://w3c.github.io/aria/#menu | WAI-ARIA `menu` role}
 */
export default function Menu({
  items: menuItems,
  onDismiss,
  orientation = 'vertical',
}: MenuProps): ReactElement {
  const enabledItems: readonly MenuItem[] = menuItems.filter(
    ({ disabled }: MenuItem): boolean => disabled !== true,
  );
  const [activeKey, setActiveKey] = useState<number | string | undefined>(
    enabledItems[0]?.key,
  );
  const itemRefs = useRef(new Map<MenuItem['key'], HTMLLIElement>());

  const activateItem = ({ disabled, onSelect }: MenuItem): void => {
    if (disabled === true) {
      return;
    }

    onSelect?.();
    onDismiss?.();
  };

  const focusItem = (key: MenuItem['key']): void => {
    setActiveKey(key);
    itemRefs.current.get(key)?.focus();
  };

  const focusRelativeItem = (key: MenuItem['key'], offset: number): void => {
    const index: number = enabledItems.findIndex(
      ({ key: itemKey }: MenuItem): boolean => itemKey === key,
    );
    const nextItem: MenuItem | undefined =
      enabledItems[
        (index + offset + enabledItems.length) % enabledItems.length
      ];

    if (nextItem !== undefined) {
      focusItem(nextItem.key);
    }
  };

  return (
    <ul aria-orientation={orientation} className={classes['menu']} role="menu">
      {menuItems.map((item: MenuItem): ReactElement => {
        const { children, disabled, items: menuItemItems, key } = item;
        const tabIndex = ((): number => {
          if (disabled) {
            return -1;
          }

          if (key === activeKey) {
            return 0;
          }

          return -1;
        })();

        const handleClick = (ev: MouseEvent<HTMLLIElement>): void => {
          ev.preventDefault();
          activateItem(item);
        };

        const handleKeyDown = (ev: KeyboardEvent<HTMLLIElement>): void => {
          switch (ev.key) {
            case 'ArrowDown': {
              ev.preventDefault();
              focusRelativeItem(key, 1);
              break;
            }

            case 'ArrowUp': {
              ev.preventDefault();
              focusRelativeItem(key, -1);
              break;
            }

            case 'Enter':
            case ' ': {
              ev.preventDefault();
              activateItem(item);
              break;
            }
          }
        };

        return (
          <li
            aria-disabled={disabled}
            aria-haspopup={menuItemItems !== undefined}
            className={classes['menu-item']}
            key={key}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            ref={(element: HTMLLIElement | null): void => {
              if (element === null) {
                itemRefs.current.delete(key);
              } else {
                itemRefs.current.set(key, element);
              }
            }}
            role="menuitem"
            tabIndex={tabIndex}
          >
            {children}
          </li>
        );
      })}
    </ul>
  );
}
