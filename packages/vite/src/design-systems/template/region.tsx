import type { ReactElement, ReactNode } from 'react';
import useElementId from '../../hooks/use-element-id.js';
import Heading from './heading.jsx';
import useLevel from '../../contexts/level/use-level.js';
import LevelProvider from '../../contexts/level/provider.jsx';

interface BaseRegionProps {
  readonly children: ReactNode;
}

export interface HeadingRegionProps extends BaseRegionProps {
  readonly heading: Exclude<ReactNode, undefined>;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelRegionProps extends BaseRegionProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByRegionProps extends BaseRegionProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type RegionProps =
  | HeadingRegionProps
  | LabelRegionProps
  | LabelledByRegionProps;

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
  const level: number = useLevel();
  const headingId: string = useElementId();

  const labelledBy: string | undefined = ((): string | undefined => {
    if (typeof heading === 'string') {
      return headingId;
    }

    if (typeof label === 'string') {
      return;
    }

    return labelledByProp;
  })();

  return (
    <section aria-label={label} aria-labelledby={labelledBy}>
      {typeof heading === 'string' && (
        <Heading id={headingId} level={level}>
          {heading}
        </Heading>
      )}
      <LevelProvider>{children}</LevelProvider>
    </section>
  );
}
