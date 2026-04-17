import type { ReactElement } from 'react';
import type { LogProps } from '../core/log-props.js';
import classes from './log.module.scss';

/**
 *   A log is a live region where new information is appended in a meaningful
 * order and older information may disappear.
 *   Examples include chat logs, messaging history, game log, or an error log.
 * In contrast to other live regions, in logs there is a relationship between
 * the arrival of new items in the log and the reading order. The log contains a
 * meaningful sequence and new information is added only to the end of the log,
 * not at arbitrary points.
 * @see {@link https://w3c.github.io/aria/#log | WAI-ARIA `log` role}
 */
export default function Log({
  children,
  live = 'polite',
}: LogProps): ReactElement {
  return (
    <div aria-live={live} className={classes['log']} role="log">
      {children}
    </div>
  );
}
