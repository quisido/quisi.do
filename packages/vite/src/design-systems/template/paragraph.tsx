import type { ReactElement, ReactNode } from 'react';

export interface ParagraphProps {
  readonly children: ReactNode;
}

/**
 * A paragraph of content.
 */
export default function Paragraph({ children }: ParagraphProps): ReactElement {
  return <p>{children}</p>;
}
