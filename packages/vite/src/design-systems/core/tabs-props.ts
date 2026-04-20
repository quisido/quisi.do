import type { ReactNode } from 'react';

export interface Tab {
  readonly active: boolean;
  readonly key: number | string;
  readonly label: string;
  readonly panel: ReactNode;
}

export interface TabsProps {
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly tabs: readonly Tab[];
}
