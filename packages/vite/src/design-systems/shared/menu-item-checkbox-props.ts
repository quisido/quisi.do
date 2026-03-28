import type { ReactNode } from 'react';

export interface MenuItemCheckboxProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}
