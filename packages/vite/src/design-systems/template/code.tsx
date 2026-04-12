import type { ReactElement } from 'react';
import type { CodeProps } from '../core/code-props.js';

/**
 *   Code is a section representing a fragment of computer code.
 * @see {@link https://w3c.github.io/aria/#code | WAI-ARIA `code` role}
 */
export default function Code({
  children,
  describedBy,
}: CodeProps): ReactElement {
  return (
    <code aria-describedby={describedBy} role="code">
      {children}
    </code>
  );
}
