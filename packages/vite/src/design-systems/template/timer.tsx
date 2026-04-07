import type { ReactElement } from 'react';
import type { TimerProps } from '../core/timer-props.js';

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
