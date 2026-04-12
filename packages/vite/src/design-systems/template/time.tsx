import type { ReactElement } from 'react';
import type { TimeProps } from '../core/time-props.js';

/**
 * A valid date or time string format list a specific point in time.
 * @see {@link https://w3c.github.io/aria/#time | WAI-ARIA `time` role}
 */
export default function Time({ children }: TimeProps): ReactElement {
  return <time>{children}</time>;
}
