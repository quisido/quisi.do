import type { ReactNode } from 'react';
import type { LabelProps } from './label-props.js';

export interface ListBoxOption {
  readonly children: ReactNode;
  readonly value: string;
}

export type ListBoxProps = LabelProps & Props;

interface Props {
  readonly onChange: (values: ReadonlySet<string>) => void;
  readonly options: readonly ListBoxOption[];
  /**
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly values: ReadonlySet<string>;
}
