import type { ReactElement } from 'react';
import type { ParagraphProps } from '../core/paragraph-props.js';

/**
 *   A paragraph is a a paragraph of content.
 *@see {@link https://w3c.github.io/aria/#paragraph | WAI-ARIA `paragraph` role}
 */
export default function Paragraph({
  children,
  id,
}: ParagraphProps): ReactElement {
  return <p id={id}>{children}</p>;
}
