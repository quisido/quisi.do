import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

interface OneOfProps {
  readonly label: string;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export type ToolbarProps = OneOf<OneOfProps> & Props;
