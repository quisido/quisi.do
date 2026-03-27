import type { ReactElement, ReactNode } from 'react';

export interface GridCellProps {
  readonly children: ReactNode;
}

export default function GridCell({ children }: GridCellProps): ReactElement {
  return <td role="gridcell">{children}</td>;
}
