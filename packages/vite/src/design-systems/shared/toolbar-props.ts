import type { ReactNode } from 'react';
import type { WithLabel } from './with-label.js';

interface Props {
  readonly children: ReactNode;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export type ToolbarProps = WithLabel<Props>;
