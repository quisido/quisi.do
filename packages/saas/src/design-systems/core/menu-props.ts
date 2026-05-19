import type { ReactNode } from 'react';

export interface MenuItem {
  readonly children: ReactNode;
  readonly disabled?: boolean | undefined;
  readonly items?: readonly MenuItem[] | undefined;
  readonly key: number | string;
  readonly onSelect?: (() => void) | undefined;
}

export interface MenuProps {
  readonly items: readonly MenuItem[];
  readonly onDismiss?: (() => void) | undefined;
  /**
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}
