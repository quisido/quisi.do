import type { ReactNode } from 'react';

export interface ApplicationProps {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
  readonly label?: string | undefined;
  readonly roleDescription?: string | undefined;
}
