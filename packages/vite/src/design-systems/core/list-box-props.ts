import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

export interface ListBoxOption {
  readonly children: ReactNode;
  readonly value: string;
}

export type ListBoxProps = OneOf<OneOfProps> & Props;

interface OneOfProps {
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly labelledBy: string;
}

interface Props {
  readonly onChange: (values: ReadonlySet<string>) => void;
  readonly options: readonly ListBoxOption[];
  /**
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly values: ReadonlySet<string>;
}
