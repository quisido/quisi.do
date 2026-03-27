import type { ReactElement, ReactNode } from 'react';

export interface MenuItemCheckboxProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}

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
