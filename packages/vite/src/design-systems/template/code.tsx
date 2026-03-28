import type { ReactElement, ReactNode } from 'react';

export interface CodeProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * A `Code` component is a section representing a fragment of computer code.
 */
export default function Code({
  children,
  describedBy,
}: CodeProps): ReactElement {
  return <code aria-describedby={describedBy}>{children}</code>;
}
