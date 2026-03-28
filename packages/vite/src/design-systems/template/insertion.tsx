import type { ReactElement, ReactNode } from 'react';

export interface InsertionProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 *   An insertion contains content that is marked as added or content that is
 * being suggested for addition.
 *   Insertions are typically used to either mark differences between two
 * versions of content or to designate content suggested for addition in
 * scenarios where multiple people are revising content.
 * @see {@link https://w3c.github.io/aria/#insertion | WAI-ARIA `insertion` role}
 */
export default function Insertion({
  children,
  describedBy,
}: InsertionProps): ReactElement {
  return <ins aria-describedby={describedBy}>{children}</ins>;
}
