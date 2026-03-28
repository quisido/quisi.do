import type { ReactElement, ReactNode } from 'react';

export interface MenuItemRadioProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}

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
