import type { ReactElement, ReactNode } from 'react';

export interface CellProps {
  readonly children: ReactNode;
}

export default function Cell({ children }: CellProps): ReactElement {
  return <td>{children}</td>;
}
