import type { ReactElement, ReactNode } from 'react';

export interface MenuItemRadioProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}

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
