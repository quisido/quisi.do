import type { ReactElement } from 'react';
import type { MenuBarProps } from '../core/menu-bar-props.js';
import classes from './menu-bar.module.scss';

/**
 * A menu bar is a presentation of menu that usually remains visible and is
 * usually presented horizontally.
 * A menu bar creates a menu bar similar to those found in Windows, Mac, and
 * Gnome desktop applications. A menu bar is used to create a consistent set of
 * frequently used commands. Ensure that menu bar interaction is similar to the
 * typical menu bar interaction in a desktop graphical user interface.
 */
export default function MenuBar({
  children,
  orientation = 'horizontal',
}: MenuBarProps): ReactElement {
  return (
    <div
      aria-orientation={orientation}
      className={classes['menu-bar']}
      role="menubar"
    >
      {children}
    </div>
  );
}
