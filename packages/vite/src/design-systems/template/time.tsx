import type { ReactElement, ReactNode } from 'react';

export interface TimeProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * A valid date or time string format list a specific point in time.
 */
export default function Time({
  children,
  describedBy,
}: TimeProps): ReactElement {
  return <time aria-describedby={describedBy}>{children}</time>;
}
