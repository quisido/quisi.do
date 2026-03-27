import type { ReactElement, ReactNode } from 'react';

export interface MarkProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * Marked or highlighted for reference or notation purposes.
 */
export default function Mark({
  children,
  describedBy,
}: MarkProps): ReactElement {
  return <mark aria-describedby={describedBy}>{children}</mark>;
}
