import type { ReactElement, ReactNode } from 'react';

export interface DeletionProps {
  readonly children: ReactNode;
}

/**
 * Content that is marked as removed or suggested for removal.
 */
export default function Deletion({ children }: DeletionProps): ReactElement {
  return <del>{children}</del>;
}
