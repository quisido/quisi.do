import type { ReactElement, ReactNode } from 'react';

export interface TableProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Table({ children, label }: TableProps): ReactElement {
  return <table aria-label={label}>{children}</table>;
}
