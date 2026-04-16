import type { ReactElement } from 'react';
import type { TimerProps } from '../core/timer-props.js';
import classes from './timer.module.scss';

/**
 *   A timer... A section of content containing a numerical counter which indicates an amount of elapsed time from a start point, or the time remaining until an end point.

The text contents of the timer object indicate the current time measurement, and are updated as that amount changes. The timer value is not necessarily machine parsable, but authors SHOULD update the text contents at fixed intervals, except when the timer is paused or reaches an end-point.
 * @see {@link https://w3c.github.io/aria/#timer | WAI-ARIA `timer` role}
 */
export default function Timer({ children, label }: TimerProps): ReactElement {
  return (
    <div className={classes['root']} aria-label={label} role="timer">
      {children}
    </div>
  );
}
