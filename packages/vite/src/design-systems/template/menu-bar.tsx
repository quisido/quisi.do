import type { ReactElement } from 'react';
import type { MenuBarProps } from '../shared/menu-bar-props.js';

/**
 *   A `MenuBar` component presents a `Menu` that usually remains visible and
 * is typically laid out horizontally, similar to menu bars in desktop
 * applications.
 */
export default function MenuBar({
  children,
  label,
}: MenuBarProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div aria-label={label} role="menubar">
      {children}
    </div>
  );
}
