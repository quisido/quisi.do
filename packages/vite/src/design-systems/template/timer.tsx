import type { ReactElement } from 'react';
import type { TimerProps } from '../core/timer-props.js';

/**
 *   A timer...
 * @see {@link https://w3c.github.io/aria/#timer | WAI-ARIA `timer` role}
 */
export default function Timer({ children, label }: TimerProps): ReactElement {
  return (
    <div aria-label={label} role="timer">
      {children}
    </div>
  );
}
