import type { ReactElement } from 'react';
import Heading from './heading.js';
import type { RegionProps } from '../core/region-props.js';
import HeadingLevelProvider from '../core/heading-level-provider.js';
import useRegion from '../core/use-region.js';

/**
 *   A region...
 * @see {@link https://w3c.github.io/aria/#region | WAI-ARIA `region` role}
 */
export default function Region({
  children,
  heading,
  label,
  labelledBy: labelledByProp,
}: RegionProps): ReactElement {
  const { headingId, headingLevel, labelledBy } = useRegion({
    heading,
    label,
    labelledBy: labelledByProp,
  });

  return (
    <section aria-label={label} aria-labelledby={labelledBy} role="region">
      <Heading id={headingId} level={headingLevel}>
        {heading}
      </Heading>
      <HeadingLevelProvider increment={heading !== undefined}>
        {children}
      </HeadingLevelProvider>
    </section>
  );
}
