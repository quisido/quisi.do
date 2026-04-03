import type { ReactNode } from 'react';

export interface StrongProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
