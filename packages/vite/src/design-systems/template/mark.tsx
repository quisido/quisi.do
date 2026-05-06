import type { ReactElement } from 'react';
import type { MarkProps } from '../core/mark-props.js';
import classes from './mark.module.scss';

/**
 * Marked content is marked or highlighted for reference or notation purposes,
 * due to the content's relevance in the enclosing context.
 * Example uses for mark include:
 * - Highlighting text in a quotation which is of special interest but is not
 *   marked in the original source material, comparable to using a highlighter
 *   pen to mark passages of a print article.
 * - Indicating portions of the content that are relevant to the user's current
 *   activity, such as highlighting text matches found by a search feature.
 * @see {@link https://w3c.github.io/aria/#mark | WAI-ARIA `mark` role}
 */
export default function Mark({
  children,
  describedBy,
}: MarkProps): ReactElement {
  return (
    <mark
      aria-describedby={describedBy}
      className={classes['mark']}
      role="mark"
    >
      {children}
    </mark>
  );
}
