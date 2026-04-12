import type { ReactElement } from 'react';
import type { TimeProps } from '../core/time-props.js';

/**
 * A valid date or time string format list a specific point in time.
 */
export default function Time({ children }: TimeProps): ReactElement {
  return <time>{children}</time>;
}
