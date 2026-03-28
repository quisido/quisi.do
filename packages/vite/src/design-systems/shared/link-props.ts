import type { ReactNode } from 'react';

export interface LinkProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly href: string;
  readonly onClick?: (() => void) | undefined;
  readonly title?: string | undefined;
}
