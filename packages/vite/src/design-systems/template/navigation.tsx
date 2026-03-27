import type { ReactElement, ReactNode } from 'react';

export interface NavigationProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Navigation({
  children,
  label,
}: NavigationProps): ReactElement {
  return <nav aria-label={label}>{children}</nav>;
}
