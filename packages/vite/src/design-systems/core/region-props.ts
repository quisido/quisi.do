import type { ReactNode } from 'react';

interface LabelProps {
  /** describes the purpose of the content in the region */
  readonly label: string;
  readonly labelledBy?: undefined;
}

interface LabelledByProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
}

export type RegionProps = (LabelProps | LabelledByProps) & Props;
