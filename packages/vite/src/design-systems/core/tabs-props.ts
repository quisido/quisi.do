import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

interface OneOfProps {
  readonly label: string;
  readonly labelledBy: string;
}

interface Props {
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly tabs: readonly Tab[];
}

export interface Tab {
  readonly active: boolean;
  readonly key: number | string;
  readonly label: string;
  readonly panel: ReactNode;
}

export type TabsProps = OneOf<OneOfProps> & Props;
