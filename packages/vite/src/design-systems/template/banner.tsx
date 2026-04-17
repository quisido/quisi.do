import type { ReactElement } from 'react';
import useBanner from '../core/use-banner.js';
import type { BannerProps } from '../core/banner-props.js';
import classes from './banner.module.scss';

/**
 *   A banner component is a landmark that contains mostly site-oriented
 * content, rather than page-specific content.
 *   Site-oriented content typically includes things such as the logo or
 * identity of the site sponsor, and a site-specific search tool. A banner
 * usually appears at the top of the page and typically spans the full width.
 * @see {@link https://w3c.github.io/aria/#banner | WAI-ARIA `banner` role}
 */
export default function Banner({ children }: BannerProps): ReactElement {
  const id: string = useBanner();

  return (
    <header className={classes['banner']} id={id}>
      {children}
    </header>
  );
}
