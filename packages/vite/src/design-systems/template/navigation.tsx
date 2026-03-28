import type { ReactElement, ReactNode } from 'react';

export interface NavigationProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Navigation` component is a landmark containing a collection of
 * navigational elements, usually links, for moving through the current or
 * related documents.
 */
export default function Navigation({
  children,
  label,
}: NavigationProps): ReactElement {
  return <nav aria-label={label}>{children}</nav>;
}
