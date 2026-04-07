import type { ReactNode } from 'react';

export interface SuperscriptProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
