import type { ReactElement, ReactNode } from 'react';

export interface DeletionProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * Content that is marked as removed or suggested for removal.
 */
export default function Deletion({
  children,
  describedBy,
}: DeletionProps): ReactElement {
  return <del aria-describedby={describedBy}>{children}</del>;
}
