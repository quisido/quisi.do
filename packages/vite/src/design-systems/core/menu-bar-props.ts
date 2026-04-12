import type { ReactNode } from 'react';

export interface MenuBarProps {
  readonly children: ReactNode;
  readonly label: string;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}
