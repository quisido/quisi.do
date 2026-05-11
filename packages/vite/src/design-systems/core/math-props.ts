import type { ReactNode } from 'react';

export interface MathProps {
  readonly children: ReactNode;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
}
