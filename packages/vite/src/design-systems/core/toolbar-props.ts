import type { ReactNode } from 'react';
import type { LabelledByProps, LabelProps } from './label-props.js';

interface Props {
  readonly children: ReactNode;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export type ToolbarProps = (LabelProps | LabelledByProps) & Props;
