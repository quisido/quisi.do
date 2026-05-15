import type { ReactNode } from 'react';

export interface MenuBarProps {
  readonly children: ReactNode;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}
