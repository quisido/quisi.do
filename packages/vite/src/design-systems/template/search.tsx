import type { ReactElement, ReactNode } from 'react';

export interface SearchProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Search({ children, label }: SearchProps): ReactElement {
  return (
    <search aria-label={label} role="search">
      {children}
    </search>
  );
}
