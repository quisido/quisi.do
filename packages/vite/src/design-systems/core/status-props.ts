import type { ReactNode } from 'react';

export interface StatusProps {
  readonly atomic?: boolean | undefined;
  readonly children: ReactNode;
  readonly id?: string | undefined;
  /**
   * @default 'polite'
   */
  readonly live?: 'off' | 'polite' | 'assertive' | undefined;
}
