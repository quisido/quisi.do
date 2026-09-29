import { type ReactElement } from 'react';

import { type TimerProps } from '../core/timer-props.js';
import classes from './timer.module.scss';

/**
 * A timer is a section of content containing a numerical counter which
 * indicates an amount of elapsed time from a start point, or the time remaining
 * until an end point.
 * The text contents of a timer indicate the current time measurement, and are
 * updated as that amount changes. The timer value is not necessarily machine
 * parsable.
 * Authors should update the text contents at fixed intervals, except when the
 * timer is paused or reaches an end-point.
 * @see {@link https://w3c.github.io/aria/#timer | WAI-ARIA `timer` role}
 */
export default function Timer({ children }: TimerProps): ReactElement {
  return (
    <div className={classes['timer']} role="timer">
      <span aria-hidden="true" className={classes['orbit']} />
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span aria-hidden="true" className={classes['squiggle']} />
      <span className={classes['frame']}>
        <span aria-hidden="true" className={classes['ticks']} />
        <span className={classes['readout']}>{children}</span>
        <span aria-hidden="true" className={classes['spark']} />
      </span>
      <span aria-hidden="true" className={classes['dots']} />
    </div>
  );
}
