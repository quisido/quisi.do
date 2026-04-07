import type { ReactNode } from 'react';

export interface TabProps {
  readonly children: ReactNode;
  readonly selected?: boolean | undefined;
}
