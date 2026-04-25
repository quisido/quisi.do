import type { ReactNode } from 'react';

export interface MarkProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
