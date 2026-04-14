import type { ReactNode } from 'react';

interface HeadingProps {
  /** describes the purpose of the content in the region */
  readonly heading: string;
  readonly labelledBy?: undefined;
}

interface LabelledByProps {
  readonly heading?: undefined;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
}

export type RegionProps = (HeadingProps | LabelledByProps) & Props;
