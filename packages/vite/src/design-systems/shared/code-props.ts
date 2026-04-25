import type { ReactNode } from 'react';

export interface CodeProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
