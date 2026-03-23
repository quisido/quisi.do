import type { ReactElement, ReactNode } from 'react';

export interface TermProps {
  readonly children: ReactNode;
}

/**
 * Word or phrase with an optional corresponding definition.
 */
export default function Term({ children }: TermProps): ReactElement {
  return <dfn>{children}</dfn>;
}
