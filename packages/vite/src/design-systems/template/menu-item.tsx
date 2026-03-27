import type { ReactElement, ReactNode } from 'react';

export interface MenuItemProps {
  readonly children: ReactNode;
}

export default function MenuItem({ children }: MenuItemProps): ReactElement {
  return <li role="menuitem">{children}</li>;
}
