import type { ReactElement, ReactNode } from 'react';

export interface MenuItemCheckboxProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}

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
