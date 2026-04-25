import type { ReactNode } from 'react';

interface Props {
  readonly heading: ReactNode | undefined;
  readonly headingId: string;
  readonly label: string | undefined;
  readonly labelledBy: string | undefined;
}

export default function useHeadingOrLabel({
  heading,
  headingId,
  label,
  labelledBy,
}: Props): string | undefined {
  return ((): string | undefined => {
    if (typeof label === 'string') {
      return;
    }

    if (typeof labelledBy === 'string') {
      return labelledBy;
    }

    if (heading === undefined) {
      return;
    }

    return headingId;
  })();
}
