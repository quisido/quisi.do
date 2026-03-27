import type { ReactElement, ReactNode } from 'react';

export interface RowHeaderProps {
  readonly children: ReactNode;
}

export default function RowHeader({ children }: RowHeaderProps): ReactElement {
  return <th scope="row">{children}</th>;
}
