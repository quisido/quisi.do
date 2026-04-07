import type { ReactNode } from 'react';

export interface HeadingProps {
  readonly children: ReactNode;
  readonly id?: string | undefined;
  readonly level: number;
}
