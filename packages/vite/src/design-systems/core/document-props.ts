import type { ReactNode } from 'react';

export interface DocumentProps {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly contentInfo?: ReactNode | undefined;
  readonly tabIndex?: number | undefined;
}
