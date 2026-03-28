import type { ReactNode } from 'react';

export interface InsertionProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
