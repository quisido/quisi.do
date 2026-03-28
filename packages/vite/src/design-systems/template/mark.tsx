import type { ReactElement } from 'react';
import type { MarkProps } from '../shared/mark-props.js';

/**
 * Marked or highlighted for reference or notation purposes.
 */
export default function Mark({
  children,
  describedBy,
}: MarkProps): ReactElement {
  return <mark aria-describedby={describedBy}>{children}</mark>;
}
