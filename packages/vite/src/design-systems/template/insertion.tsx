import type { ReactElement, ReactNode } from 'react';

export interface InsertionProps {
  readonly children: ReactNode;
}

/**
 *   Content that is marked as added or content that is being suggested for
 * addition.
 */
export default function Insertion({ children }: InsertionProps): ReactElement {
  return <ins>{children}</ins>;
}
