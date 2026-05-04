import type { ReactElement } from 'react';
import Heading from './heading.js';
import type { RegionProps } from '../core/region-props.js';
import useRegion from '../core/use-region.js';
import classes from './region.module.scss';
import SectionHeader from './section-header.js';

/**
 *   A region landmark contains content that is relevant to a specific purpose
 * and sufficiently important that users will likely want to be able to navigate
 * to the section easily and to have it listed in a summary of the page.
 *   Limit use of regions to sections containing content with a purpose that is
 * not accurately described by banners, complementary landmarks, content info,
 * forms, main landmarks, navigation landmarks, or searches.
 * @see {@link https://w3c.github.io/aria/#region | WAI-ARIA `region` role}
 */
export default function Region({
  children,
  heading,
}: RegionProps): ReactElement {
  const { headingId } = useRegion();

  return (
    <section
      aria-labelledby={headingId}
      className={classes['region']}
      role="region"
    >
      <SectionHeader>
        <Heading id={headingId}>{heading}</Heading>
      </SectionHeader>
      <div>{children}</div>
    </section>
  );
}
