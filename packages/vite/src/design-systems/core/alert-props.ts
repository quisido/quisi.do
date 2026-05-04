import type { ReactNode } from 'react';
import type { RequiredReactNode } from './required-react-node.js';

export interface AlertProps {
  /**
   * @default true
   */
  readonly atomic?: boolean | undefined;
  readonly children: ReactNode;
  readonly heading: RequiredReactNode;
  readonly icon?: string | undefined;
  /**
   * @default 'assertive'
   */
  readonly live?: 'off' | 'assertive' | 'polite' | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}
