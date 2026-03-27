import type { ReactElement, ReactNode } from 'react';

export interface RowProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Row({ children, label }: RowProps): ReactElement {
  return <tr aria-label={label}>{children}</tr>;
}
