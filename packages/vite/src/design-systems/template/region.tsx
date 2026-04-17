import type { ReactElement } from 'react';
import Heading from './heading.js';
import type { RegionProps } from '../core/region-props.js';
import HeadingLevelProvider from '../core/heading-level-provider.js';
import useRegion from '../core/use-region.js';
import classes from './region.module.scss';

/**
 *   A region landmark contains content that is relevant to a specific purpose
 * and sufficiently important that users will likely want to be able to navigate
 * to the section easily and to have it listed in a summary of the page.
 *   Limit use of regions to sections containing content with a purpose that is
 * not accurately described by banners, complementary landmarks, content info,
 * forms, main landmarks, navigation landmarks, or searches.
 *   Authors SHOULD include the label inside of a heading whenever possible. The heading MAY be an instance of the standard host language heading element or an instance of an element with role heading.
 * @see {@link https://w3c.github.io/aria/#region | WAI-ARIA `region` role}
 */
export default function Region({
  children,
  heading,
  labelledBy: labelledByProp,
}: RegionProps): ReactElement {
  const hasHeading: boolean = heading !== undefined;
  const { headingId, headingLevel, labelledBy } = useRegion({
    hasHeading,
    labelledBy: labelledByProp,
  });

  return (
    <section
      aria-labelledby={labelledBy}
      className={classes['region']}
      role="region"
    >
      <Heading id={headingId} level={headingLevel}>
        {heading}
      </Heading>
      <HeadingLevelProvider increment={hasHeading}>
        {children}
      </HeadingLevelProvider>
    </section>
  );
}
