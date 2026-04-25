import type { ReactElement } from 'react';
import type { NoteProps } from '../shared/note-props.js';

/**
 *   A `Note` component adds parenthetic or ancillary content when no other
 * components fits the purpose.
 */
export default function Note({ children }: NoteProps): ReactElement {
  return <div role="note">{children}</div>;
}
