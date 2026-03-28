import type { ReactNode } from 'react';

export interface RowGroupProps {
  readonly children: ReactNode;
  readonly label: string;
  readonly section?: 'body' | 'footer' | 'head' | undefined;
}
