import useId from './use-id.js';
import useHeadingLevel from './use-heading-level.js';

interface Props {
  readonly hasHeading: boolean;
  readonly labelledBy: string | undefined;
}

export interface RegionState {
  readonly headingId: string;
  readonly headingLevel: number;
  readonly labelledBy: string | undefined;
}

export default function useRegion({
  hasHeading,
  labelledBy: labelledByProp,
}: Props): RegionState {
  const headingId: string = useId();

  return {
    headingId,
    headingLevel: useHeadingLevel(),

    labelledBy: ((): string | undefined => {
      if (hasHeading) {
        return headingId;
      }

      return labelledByProp;
    })(),
  };
}
