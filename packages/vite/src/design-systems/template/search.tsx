import type { ReactElement, ReactNode } from 'react';

export interface SearchProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Search` component is a landmark region containing items and objects
 * that, together, create a search facility.
 */
export default function Search({ children, label }: SearchProps): ReactElement {
  return (
    <search aria-label={label} role="search">
      {children}
    </search>
  );
}
