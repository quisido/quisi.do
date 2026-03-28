import type { ReactElement, ReactNode } from 'react';

export interface TimerProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Timer` component contains a numerical counter showing elapsed time from
 * a start point or the time remaining until an end point.
 */
export default function Timer({ children, label }: TimerProps): ReactElement {
  return (
    <div aria-label={label} role="timer">
      {children}
    </div>
  );
}
