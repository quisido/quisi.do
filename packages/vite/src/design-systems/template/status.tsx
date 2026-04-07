import type { ReactElement } from 'react';
import type { StatusProps } from '../core/status-props.js';

/**
 *   A `Status` component is a live region for advisory information that is not
 * important enough to justify an `Alert`. It is often presented like a status
 * bar and should not take focus when it updates.
 */
export default function Status({ children, label }: StatusProps): ReactElement {
  return (
    <div aria-label={label} role="status">
      {children}
    </div>
  );
}
