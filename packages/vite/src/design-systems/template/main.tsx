import type { ReactElement, ReactNode } from 'react';

export interface MainProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Main({ children, label }: MainProps): ReactElement {
  return <main aria-label={label}>{children}</main>;
}
