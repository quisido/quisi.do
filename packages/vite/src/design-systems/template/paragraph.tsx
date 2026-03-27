import type { ReactElement, ReactNode } from 'react';

export interface ParagraphProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 * A paragraph of content.
 */
export default function Paragraph({
  children,
  describedBy,
}: ParagraphProps): ReactElement {
  return <p aria-describedby={describedBy}>{children}</p>;
}
