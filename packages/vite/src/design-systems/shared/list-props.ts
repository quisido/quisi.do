import type { ReactNode } from 'react';

export interface ListProps {
  readonly children: ReactNode;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly ordered?: boolean | undefined;
}
