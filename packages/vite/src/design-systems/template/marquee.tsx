import type { ReactElement } from 'react';
import type { MarqueeProps } from '../core/marquee-props.js';
import classes from './marquee.module.scss';

/**
 * A marquee is a section of content where non-essential information changes
 * frequently.
 * Common usages of marquee include stock tickers and ad banners.
 * @see {@link https://w3c.github.io/aria/#marquee | WAI-ARIA `marquee` role}
 */
export default function Marquee({ children }: MarqueeProps): ReactElement {
  return (
    <div className={classes['marquee']} role="marquee">
      {children}
    </div>
  );
}
