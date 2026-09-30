import { type ReactElement } from 'react';

import { type BlockQuoteProps } from '../core/block-quote-props.js';
import classes from './block-quote.module.scss';

/**
 * A block quote is a section of content that is quoted from another source.
 * @see {@link https://w3c.github.io/aria/#blockquote | WAI-ARIA `blockquote` role}
 */
export default function BlockQuote({
  children,
}: BlockQuoteProps): ReactElement {
  return (
    <blockquote className={classes['block-quote']} role="blockquote">
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span aria-hidden="true" className={classes['dot-field']} />
      <span aria-hidden="true" className={classes['quote-mark']}>
        “
      </span>
      <div className={classes['content']}>{children}</div>
      <span aria-hidden="true" className={classes['scribble']} />
    </blockquote>
  );
}
