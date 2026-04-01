import type { ReactElement } from 'react';
import type { CodeProps } from '../shared/code-props.js';

/**
 * A `Code` component is a section representing a fragment of computer code.
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
