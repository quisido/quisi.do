import type { ReactElement, ReactNode } from 'react';

export interface MenuProps {
  readonly children: ReactNode;
  readonly label: string;
}

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
