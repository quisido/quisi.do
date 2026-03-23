import type { ReactElement, ReactNode } from 'react';

export interface TimeProps {
  readonly children: ReactNode;
}

/**
 * A valid date or time string format list a specific point in time.
 */
export default function Time({ children }: TimeProps): ReactElement {
  return <time>{children}</time>;
}
