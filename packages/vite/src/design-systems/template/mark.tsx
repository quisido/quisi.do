import type { ReactElement, ReactNode } from 'react';

export interface MarkProps {
  readonly children: ReactNode;
}

/**
 * Marked or highlighted for reference or notation purposes.
 */
export default function Mark({ children }: MarkProps): ReactElement {
  return <mark>{children}</mark>;
}
