import type { ReactElement, ReactNode } from 'react';

export interface MenuBarProps {
  readonly children: ReactNode;
  readonly label: string;
}

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
