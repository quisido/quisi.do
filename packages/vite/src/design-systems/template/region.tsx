import type { ReactElement } from 'react';
import Heading from './heading.js';
import type { RegionProps } from '../shared/region-props.js';
import HeadingLevelProvider from '../shared/heading-level-provider.jsx';
import useRegion from '../shared/use-region.js';

/**
 *   The `Region` component is used to identify document areas the author deems
 * significant. It is a generic landmark available to aid in navigation when
 * none of the other landmark roles are appropriate.
 *   The `Region` component should be reserved for sections of content
 * sufficiently important that users will likely want to navigate to the section
 * easily and to have it listed in a summary of the page. The `Region` component
 * is a more generic term, and should only be used if the section needing to be
 * identified is not accurately described by one of the other landmark
 * components, such as `Banner`, `Complementary`, `ContentInfo`, `Main`, or
 * `Navigation`.
 */
export default function Region({
  children,
  heading,
  label,
  labelledBy: labelledByProp,
}: RegionProps): ReactElement {
  const { headingId, labelledBy, level } = useRegion({
    heading,
    label,
    labelledBy: labelledByProp,
  });

  if (heading === undefined) {
    return (
      <section aria-label={label} aria-labelledby={labelledBy}>
        {children}
      </section>
    );
  }

  return (
    <section aria-label={label} aria-labelledby={labelledBy}>
      <Heading id={headingId} level={level}>
        {heading}
      </Heading>
      <HeadingLevelProvider>{children}</HeadingLevelProvider>
    </section>
  );
}
