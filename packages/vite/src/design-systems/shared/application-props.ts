import type { ReactNode } from 'react';

export interface ApplicationProps {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly contentInfo?: ReactNode | undefined;
  readonly describedBy?: string | undefined;
  readonly label?: string | undefined;
  readonly roleDescription?: string | undefined;
}
