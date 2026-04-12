import type { ReactElement } from 'react';
import type { MarqueeProps } from '../core/marquee-props.js';

/**
 *   A marquee is a section of content where non-essential information changes
 * frequently.
 *   Common usages of marquee include stock tickers and ad banners.
 * @see {@link https://w3c.github.io/aria/#marquee | WAI-ARIA `marquee` role}
 */
export default function Marquee({
  children,
  label,
}: MarqueeProps): ReactElement {
  return (
    <div aria-label={label} role="marquee">
      {children}
    </div>
  );
}
