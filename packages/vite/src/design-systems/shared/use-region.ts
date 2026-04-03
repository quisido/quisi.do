import type { ReactNode } from 'react';
import useId from './use-id.js';
import useHeadingLevel from './use-heading-level.js';
import useHeadingOrLabel from './use-heading-or-label.js';

interface Props {
  readonly heading: ReactNode | undefined;
  readonly label: string | undefined;
  readonly labelledBy: string | undefined;
}

export interface RegionState {
  readonly headingId: string;
  readonly headingLevel: number;
  readonly labelledBy: string | undefined;
}

export default function useRegion({
  heading,
  label,
  labelledBy: labelledByProp,
}: Props): RegionState {
  const headingId: string = useId();

  return {
    headingId,
    headingLevel: useHeadingLevel(),

    labelledBy: useHeadingOrLabel({
      heading,
      headingId,
      label,
      labelledBy: labelledByProp,
    }),
  };
}
