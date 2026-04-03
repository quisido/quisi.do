import type { ReactNode } from 'react';

export interface MenuItemRadioProps {
  readonly checked?: boolean | undefined;
  readonly children: ReactNode;
}
