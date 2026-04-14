import type { ReactElement } from 'react';
import type { TimeProps } from '../core/time-props.js';

/**
 *   Time represents a specific point in time with a valid date- or time-related
 * string.
 * @see {@link https://w3c.github.io/aria/#time | WAI-ARIA `time` role}
 */
export default function Time({ children }: TimeProps): ReactElement {
  return <time>{children}</time>;
}
