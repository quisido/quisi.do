import type { ReactElement } from 'react';
import type { ParagraphProps } from '../core/paragraph-props.js';
import classes from './paragraph.module.scss';

/**
 * A paragraph is a a paragraph of content.
 *@see {@link https://w3c.github.io/aria/#paragraph | WAI-ARIA `paragraph` role}
 */
export default function Paragraph({
  children,
  id,
}: ParagraphProps): ReactElement {
  return (
    <p className={classes['paragraph']} id={id}>
      {children}
    </p>
  );
}
