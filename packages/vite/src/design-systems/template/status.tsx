import type { ReactElement } from 'react';
import type { StatusProps } from '../core/status-props.js';

/**
 *   A status...
 * @see {@link https://w3c.github.io/aria/#status | WAI-ARIA `status` role}
 */
export default function Status({ children, label }: StatusProps): ReactElement {
  return (
    <div aria-label={label} role="status">
      {children}
    </div>
  );
}
