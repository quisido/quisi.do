import type { ReactElement } from 'react';
import type { BlockQuoteProps } from '../core/block-quote-props.js';

/**
 *   A block quote is a section of content that is quoted from another source.
 * @see {@link https://w3c.github.io/aria/#blockquote | WAI-ARIA `blockquote` role}
 */
export default function BlockQuote({
  children,
}: BlockQuoteProps): ReactElement {
  return <blockquote role="blockquote">{children}</blockquote>;
}
