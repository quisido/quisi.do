import type { ReactNode } from 'react';

export interface LogProps {
  readonly children: ReactNode;
  /**
   * @default 'polite'
   */
  readonly live?: 'off' | 'polite' | 'assertive' | undefined;
}
