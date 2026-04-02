import type { ReactElement } from 'react';
import type { BlockQuoteProps } from '../shared/block-quote-props.js';

/**
 * A section of content that is quoted from another source.
 * @see {@link https://w3c.github.io/aria/#blockquote | WAI-ARIA `blockquote` role}
 */
export default function BlockQuote({
  children,
}: BlockQuoteProps): ReactElement {
  return <blockquote role="blockquote">{children}</blockquote>;
}
