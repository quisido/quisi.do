import type { ReactNode } from 'react';
import type KeyProps from './key-props.js';

interface MenuItemProps {
  readonly children: ReactNode;
  readonly disabled?: boolean | undefined;
  readonly items?: readonly MenuItem[] | undefined;
}

export interface MenuProps {
  readonly items: readonly MenuItem[];
  readonly label: string;
  /**
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export type MenuItem = KeyProps & MenuItemProps;
