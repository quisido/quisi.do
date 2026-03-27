import type { ReactElement, ReactNode } from 'react';

export interface TermProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * Word or phrase with an optional corresponding definition.
 */
export default function Term({
  children,
  describedBy,
}: TermProps): ReactElement {
  return <dfn aria-describedby={describedBy}>{children}</dfn>;
}
