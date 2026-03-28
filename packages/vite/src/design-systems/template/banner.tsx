import type { ReactElement } from 'react';
import useBanner from '../shared/use-banner.js';
import type { BannerProps } from '../shared/banner-props.js';

/**
 *   A `Banner` component is a landmark that contains mostly site-oriented
 * content, rather than page-specific content.
 *   Site-oriented content typically includes things such as the logo or
 * identity of the site sponsor, and a site-specific search tool. A banner
 * usually appears at the top of the page and typically spans the full width.
 * @see {@link https://w3c.github.io/aria/#banner | WAI-ARIA `banner` role}
 */
export default function Banner({ children, label }: BannerProps): ReactElement {
  const id: string = useBanner();

  return (
    <header aria-label={label} id={id}>
      {children}
    </header>
  );
}
