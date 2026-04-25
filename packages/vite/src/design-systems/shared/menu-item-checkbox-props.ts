import type { ReactNode } from 'react';

export interface MenuItemCheckboxProps {
  readonly checked?: 'mixed' | boolean | undefined;
  readonly children: ReactNode;
}
