import type { ReactElement } from 'react';
import type { TimeProps } from '../shared/time-props.js';

/**
 * A valid date or time string format list a specific point in time.
 */
export default function Time({
  children,
  describedBy,
}: TimeProps): ReactElement {
  return <time aria-describedby={describedBy}>{children}</time>;
}
