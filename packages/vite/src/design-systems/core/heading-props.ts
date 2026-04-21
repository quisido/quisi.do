import type { ReactNode } from 'react';

export interface HeadingProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly id?: string | undefined;
}
