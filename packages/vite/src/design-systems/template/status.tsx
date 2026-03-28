import type { ReactElement, ReactNode } from 'react';

export interface StatusProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Status` component is a live region for advisory information that is not
 * important enough to justify an `Alert`. It is often presented like a status
 * bar and should not take focus when it updates.
 */
export default function Status({ children, label }: StatusProps): ReactElement {
  return (
    <div aria-label={label} role="status">
      {children}
    </div>
  );
}
