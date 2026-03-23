import type { ReactElement, ReactNode } from 'react';

export interface CodeProps {
  readonly children: ReactNode;
}

/**
 * A section representing a fragment of computer code.
 */
export default function Code({ children }: CodeProps): ReactElement {
  return <code>{children}</code>;
}
