import type { ReactNode } from 'react';

export interface RegionProps {
  readonly children: ReactNode;
  /** describes the purpose of the content in the region */
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
}
