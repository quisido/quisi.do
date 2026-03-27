import type { ReactElement, ReactNode } from 'react';

export interface BlockQuoteProps {
  readonly children: ReactNode;
}

/**
 * A section of content that is quoted from another source.
 * @see https://w3c.github.io/aria/#blockquote
 */
export default function BlockQuote({
  children,
}: BlockQuoteProps): ReactElement {
  return <blockquote>{children}</blockquote>;
}
