import type { ReactElement, ReactNode } from 'react';

export interface ColumnHeaderProps {
  readonly children: ReactNode;
}

export default function ColumnHeader({
  children,
}: ColumnHeaderProps): ReactElement {
  return <th scope="col">{children}</th>;
}
