import { type MouseEvent, type ReactNode } from 'react';

export interface LinkProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly href: string;
  readonly onClick?: ((event: MouseEvent) => void) | undefined;
  readonly title?: string | undefined;
}
