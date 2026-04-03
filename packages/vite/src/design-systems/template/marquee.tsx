import type { ReactElement } from 'react';
import type { MarqueeProps } from '../shared/marquee-props.js';

/**
 *   A `Marquee` component contains non-essential information that changes
 * frequently, such as a stock ticker or rotating promotional content.
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
