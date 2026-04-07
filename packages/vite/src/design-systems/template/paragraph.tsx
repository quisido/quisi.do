import type { ReactElement } from 'react';
import type { ParagraphProps } from '../core/paragraph-props.js';

/**
 * A paragraph of content.
 */
export default function Paragraph({
  children,
  id,
}: ParagraphProps): ReactElement {
  return <p id={id}>{children}</p>;
}
