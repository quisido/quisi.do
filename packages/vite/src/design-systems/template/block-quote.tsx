import type { ReactElement, ReactNode } from 'react';

export interface BlockQuoteProps {
  readonly children: ReactNode;
}

/**
 * A section of content that is quoted from another source.
 */
export default function BlockQuote({
  children,
}: BlockQuoteProps): ReactElement {
  return <blockquote>{children}</blockquote>;
}
