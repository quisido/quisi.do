import type { ReactNode } from 'react';

export interface ListItem {
  readonly children: ReactNode;
  readonly key: number | string;
}

export interface ListProps {
  readonly items: readonly ListItem[];
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly ordered?: boolean | undefined;
}
