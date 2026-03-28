import type { ReactElement, ReactNode } from 'react';

export interface MenuProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Menu` component is a widget that offers a list of choices to the user.
 * It is typically presented as a popup or overlay containing menu items that
 * invoke actions or functions.
 */
export default function Menu({ children, label }: MenuProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <ul aria-label={label} role="menu">
      {children}
    </ul>
  );
}
