import type { ReactElement, ReactNode } from 'react';

export interface InsertionProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 *   Content that is marked as added or content that is being suggested for
 * addition.
 */
export default function Insertion({
  children,
  describedBy,
}: InsertionProps): ReactElement {
  return <ins aria-describedby={describedBy}>{children}</ins>;
}
