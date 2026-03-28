import type { ReactNode } from 'react';

export interface SubscriptProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}
