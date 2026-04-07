import type { ReactElement } from 'react';
import type { LogProps } from '../core/log-props.js';

/**
 *   A `Log` component is a live region where new information is appended in a
 * meaningful order and older information may disappear. Typical examples
 * include chat histories, game logs, and error logs.
 */
export default function Log({ children, label }: LogProps): ReactElement {
  return (
    <div aria-label={label} role="log">
      {children}
    </div>
  );
}
