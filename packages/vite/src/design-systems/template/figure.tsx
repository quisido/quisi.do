import type { ReactElement, ReactNode } from 'react';

export interface FigureProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Figure({ children, label }: FigureProps): ReactElement {
  return <figure aria-label={label}>{children}</figure>;
}
